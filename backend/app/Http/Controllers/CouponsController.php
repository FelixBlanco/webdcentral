<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Image;
use App\Coupons;
use App\CouponsClient;


class CouponsController extends Controller {
    //
    public function create(Request $request) {
        try {

            $this->validate($request, [

                'fk_idProducto' => 'required',
                'title'         => 'required',
                'description'   => 'required',
                'dateExpired'   => 'required',
            ], [
                'filename.required'      => 'El campo es requerido',
                'fk_idProducto.required' => 'El campo es requerido',
                'title.required'         => 'El campo es requerido',
                'description.required'   => 'El campo es requerido',
                'dateExpired.required'   => 'El campo es requerido',

            ]);


            $originalImage = $request->filename;

            $thumbnailImage = Image::make($originalImage);

            $thumbnailImage->fit(2048, 2048, function($constraint) {
                $constraint->aspectRatio();
            });


            $nombre_publico = $originalImage->getClientOriginalName();
            $extension      = $originalImage->getClientOriginalExtension();

            $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
            $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;


            Storage::disk('local')->put('/coupons/'.$nombre_interno, (string) $thumbnailImage->encode());

            DB::beginTransaction();

            $Coupons                = new Coupons();
            $Coupons->imagen        = $nombre_interno;
            $Coupons->fk_idProducto = $request->fk_idProducto;
            $Coupons->title         = $request->title;
            $Coupons->description   = $request->description;
            $Coupons->dateExpired   = $request->dateExpired;
            $Coupons->codeCoupns    = strtoupper($this->_getCodeSys());
            $Coupons->fk_idSatate   = 1;
            $Coupons->save();
            DB::commit();


            $response = [
                'msj' => 'Cupon guardado exitosamente',
            ];

            return response()->json($response, 201);

        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en CouponsController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }


    }

    public function _getCodeSys() {
        $oldCode = 0;
        $rs      = Coupons::orderBy('idCoupons', 'DESC')->first();
        if ($rs) {
            $oldCode = $rs->idCoupons;
        }

        return substr(md5($oldCode), 0, 5);
    }

    public function listar(Request $request) {

        $Coupons = Coupons::leftjoin("tb_productos", "tb_productos.idProducto", "=", "tb_coupons.fk_idProducto");

        $date = date('Y-m-d');
        if ($request->active) {// Solo no expiradas
            $Coupons->where('dateExpired', '>=', $date);

        }

        if ($request->search != "") {
            $Coupons->where('codeCoupns', 'like', '%'.$request->search.'%');
            $Coupons->orWhere('title', 'like', '%'.$request->search.'%');
            $Coupons->orWhere('description', 'like', '%'.$request->search.'%');
        }

        $result = $Coupons->get();

        $result->each(function($result) {
            $result->set_imagen = asset('storage/coupons/'.$result->imagen);
        });

        $response = [
            'msj'     => 'Lista de Cupones',
            'cupones' => $result,
        ];

        return response()->json($response, 201);
    }


    public function listarPorId($idCoupons) {

        $Coupons = Coupons::findOrFail($idCoupons);

        $response = [
            'msj'   => 'Resultado del cupones: '.$idCoupons,
            'cupon' => $Coupons,
        ];

        return response()->json($response, 201);
    }

    public function obtenerCupon(Request $request, $id) {
        DB::beginTransaction();

        try {
            $cupon = CouponsClient::where("fk_idUser", "=", $request->idUser)
                ->where("fk_idcoupons", "=", $request->idcoupons)
                ->first();

            if ($cupon) {
                return response()->json('Usted ya posee este cupon', 400);
            } else {

                $Coupons               = new CouponsClient();
                $Coupons->fk_idUser    = $request->fk_idUser;
                $Coupons->fk_idcoupons = $request->fk_idcoupons;
                $Coupons->fk_idSatate  = 1;
                $Coupons->save();

                $response = [
                    'msj'   => 'Cupon Obtenido',
                    'cupon' => $Coupons,
                ];
                DB::commit();

                return response()->json($response, 200);
            }


        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en CouponsController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }


    public function chague($idCuponsClient) {

        DB::beginTransaction();

        try {
            $cupon              = CouponsClient::findOrFail($idCuponsClient);
            $cupon->fk_idSatate = 2;
            $cupon->update();

            $response = [
                'msj'   => 'Cupon cangeado correctamente',
                'cupon' => $cupon,
            ];
            DB::commit();

            return response()->json($response, 200);

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en CouponsController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }
}
