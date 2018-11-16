<?php

namespace App\Http\Controllers;

use App\LocalesAdherido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Image;

class LocalesAdheridoController extends Controller
{
    public function store(Request $request)
    {

        $this->validate($request, [
            'fk_idClasificado' => 'required',
            'nombre'           => 'required',
            'descripcion'      => 'required',
            'foto_1'           => 'image|required|mimes:jpeg,png,jpg,gif,svg',
            'foto_2'           => 'image|required|mimes:jpeg,png,jpg,gif,svg',
        ], [
            'fk_idClasificado.required' => 'El campo es requerido',
            'nombre.required'           => 'El campo es requerido',
            'descripcion.required'      => 'El campo es requerido',
            'foto_1.required'           => 'El campo es requerido',
            'foto_2.required'           => 'El campo es requerido',
            'foto_1.image'              => 'La imagen debe tener el formato jpeg, pnp,gif,svg',
            'foto_2.image'              => 'La imagen debe tener el formato jpeg, pnp,gif,svg',
            'foto_1.mimes'              => 'La imagen debe tener el formato jpeg, pnp,gif,svg',
            'foto_2.mimes'              => 'La imagen debe tener el formato jpeg, pnp,gif,svg',
        ]);

        DB::beginTransaction();

        try {

            $LAH = new LocalesAdherido($request->all());

            if (is_null($request->foto_1)) {
            } else {

                /*para la foto*/
                $originalImage = $request->foto_1;

                $thumbnailImage = Image::make($originalImage);
                $thumbnailImage->fit(2048, 2048, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $nombre_publico = $originalImage->getClientOriginalName();
                $extension = $originalImage->getClientOriginalExtension();
                $nombre_interno1 = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno1 = str_slug($nombre_interno1, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
                Storage::disk('local')->put('/localesAdheridos/'.$nombre_interno1, (string) $thumbnailImage->encode());
                /*para la foto*/

                $LAH->foto_1 = $nombre_interno1;

                /*para la foto*/
                $originalImage = $request->foto_2;

                $thumbnailImage = Image::make($originalImage);
                $thumbnailImage->fit(2048, 2048, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $nombre_publico = $originalImage->getClientOriginalName();
                $extension = $originalImage->getClientOriginalExtension();
                $nombre_interno2 = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno2 = str_slug($nombre_interno2, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
                Storage::disk('local')->put('/localesAdheridos/'.$nombre_interno2, (string) $thumbnailImage->encode());
                /*para la foto*/

                $LAH->foto_2 = $nombre_interno2;
            }
            $LAH->fk_idUser = Auth::user()->fk_idPerfil;

            $LAH->save();

            $response = [
                'msj'      => 'Local Creado',
                'LocalAdh' => $LAH,
            ];
            DB::commit();

            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en LocalesAdheridoController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function listar(Request $request)
    {

        if ($request->exists('offset') && $request->exists('limit')) {

            $this->validate($request, [
                'offset' => 'integer|min:1',
                'limit'  => 'integer|min:1',
            ], [
                'offset.integer' => 'Debe ser numérico',
                'limit.integer'  => 'Debe ser numérico',

                'offset.min' => 'Debe tener al menos un número',
                'limit.min'  => 'Debe tener al menos un número',
            ]);

            $LAH = LocalesAdherido::offset($request->offset)->limit($request->limit)->with('user')->get();
        } else {
            if ($request->exists('search')) {

                $busqueda = "%".$request->search."%";

                $LAH = LocalesAdherido::where('nombre', 'like', $busqueda)->orWhere('descripcion', 'like', $busqueda)->with('user')->get();
            } else {

                $LAH = LocalesAdherido::with('user')->get();
            }
        }

        $LAH->each(function ($LAH) {
            $LAH->set_imagen = asset('storage/localesAdheridos/'.$LAH->imagen);
        });

        $response = [
            'msj'      => 'Lista de Locales Adheridos',
            'LocalAdh' => $LAH,
        ];

        return response()->json($response, 201);

    }

    public function listarPorId(Request $request, $idLocalAdherido)
    {
        if ($request->exists('offset') && $request->exists('limit')) {

            $this->validate($request, [
                'offset' => 'integer|min:1',
                'limit'  => 'integer|min:1',
            ], [
                'offset.integer' => 'Debe ser numérico',
                'limit.integer'  => 'Debe ser numérico',

                'offset.min' => 'Debe tener al menos un número',
                'limit.min'  => 'Debe tener al menos un número',
            ]);

            $LAH = LocalesAdherido::offset($request->offset)->limit($request->limit)->with('user')->get();
        } else {
            if ($request->exists('search')) {

                $busqueda = "%".$request->search."%";

                $LAH = LocalesAdherido::where('nombre', 'like', $busqueda)->orWhere('descripcion', 'like', $busqueda)->with('user')->get();
            } else {

                $LAH = LocalesAdherido::find($idLocalAdherido);
            }
        }
        if (!is_null($LAH)) {
            $LAH->each(function ($LAH) {
                $LAH->set_imagen = asset('storage/localesAdheridos/'.$LAH->imagen);
            });
        }

        $response = [
            'msj'      => 'Lista de Locales Adheridos',
            'LocalAdh' => $LAH,
        ];

        return response()->json($response, 201);


        $LAH = LocalesAdherido::with('user')->findOrFail($idLocalAdherido);

        $response = [
            'msj'      => 'Lista de Locales Adheridos',
            'LocalAdh' => $LAH,
        ];

        return response()->json($response, 201);
    }

    public function destroy($idLocalAdherido)
    {

        DB::beginTransaction();

        try {
            $LAH = LocalesAdherido::findOrFail($idLocalAdherido);
            $LAH->delete();

            $response = [
                'msj' => 'Local Adherido eliminado Correctamente',
            ];

            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en LocalesAdheridoController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }
}
