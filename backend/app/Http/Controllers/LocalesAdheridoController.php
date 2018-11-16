<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Image;

class LocalesAdheridoController extends Controller {

    public function store(Request $request) {


        $this->validate($request, [
            'fk_idClasificado' => 'required',
            'nombre'           => 'required',
            'descripción'      => 'required',
            'foto_1'           => 'image|required|mimes:jpeg,png,jpg,gif,svg',
            'foto_2'           => 'image|required|mimes:jpeg,png,jpg,gif,svg',
            'fk_idUser'        => 'required',
        ], [
            'fk_idClasificado.required' => 'El campo es requerido',
            'nombre.required'           => 'El campo es requerido',
            'descripción.required'      => 'El campo es requerido',
            'foto_1.required'           => 'El campo es requerido',
            'foto_2.required'           => 'El campo es requerido',
            'fk_idUser.required'        => 'El campo es requerido',

        ]);

        DB::beginTransaction();

        try {

            $LAH = new LocalesAdheridoController($request->all());

            if (is_null($request->foto_1)) {

            } else {

                /*para la foto*/
                $originalImage = $request->foto_1;

                $thumbnailImage = Image::make($originalImage);
                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });
                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();
                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
                Storage::disk('local')->put('/localesAdheridos/'.$nombre_interno, (string) $thumbnailImage->encode());
                /*para la foto*/

                $LAH->foto_2 = $nombre_interno2;

                /*para la foto*/
                $originalImage = $request->foto_1;

                $thumbnailImage = Image::make($originalImage);
                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });
                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();
                $nombre_interno2 = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno2 = str_slug($nombre_interno2, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
                Storage::disk('local')->put('/localesAdheridos/'.$nombre_interno2, (string) $thumbnailImage->encode());
                /*para la foto*/

                $LAH->foto_2 = $nombre_interno2;
            }

            $LAH->save();

            $response = [
                'msj'  => 'Local Creado',
                'LocalAdh' => $LAH,
            ];
            DB::commit();

            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en UserController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }
}
