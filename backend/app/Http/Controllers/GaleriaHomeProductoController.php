<?php

namespace App\Http\Controllers;

use App\GaleriaHomeProductos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Image;

class GaleriaHomeProductoController extends Controller
{
    public function listar()
    {

        $galeriaHomeProd = GaleriaHomeProductos::get();

        $galeriaHomeProd->each(function ($galeriaHomeProd) {
            $galeriaHomeProd->set_imagen = asset('storage/galeriaProductos/'.$galeriaHomeProd->imagen);
            $galeriaHomeProd->statu;
        });

        $response = [
            'msj'     => 'Lista de la galeria',
            'galeria' => $galeriaHomeProd,
        ];

        return response()->json($response, 201);
    }

    public function listarPorId($idGaleriaHomeProducto)
    {

        $galeriaHomeProd = GaleriaHomeProductos::with('statu')->findOrFail($idGaleriaHomeProducto);

        $response = [
            'msj'     => 'Resultado de la galeria: '.$idGaleriaHomeProducto,
            'galeria' => $galeriaHomeProd,
        ];

        return response()->json($response, 201);
    }

    public function createGaleria(Request $request)
    {

        if (Auth::user()->fk_idPerfil == 1) {

            $this->validate($request, [
                'titulo' => 'required',
                'imagen' => 'image|required|mimes:jpeg,png,jpg,gif,svg',

            ], [
                'titulo.required' => 'El titulo es requerido',
                'imagen.required' => 'La imagen es requerida',

            ]);

            try {
                DB::beginTransaction();

                $originalImage = $request->imagen;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function ($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('/galeriaProductos/'.$nombre_interno, (string) $thumbnailImage->encode());

                $imagemodel = new GaleriaHomeProductos();
                $imagemodel->titulo = $request->titulo;

                $imagemodel->imagen = $nombre_interno;
                $imagemodel->fk_idStatusSistema = 1;
                $imagemodel->save();

                DB::commit();

                $response = [
                    'msj'         => 'Galeria guardada exitosamente',
                    'id_dataBase' => $imagemodel->idGaleriaHomeProducto,
                    'calidad'     => '2048*2048',
                    'size'        => $size = (Storage::size('/galeriaProductos/'.$nombre_interno) / 1000000).' Mb',
                    'name'        => 'storage/galeriaProductos/'.$nombre_interno,
                ];

                return response()->json($response, 201);
            } catch (\Exception $e) {

                DB::rollback();
                Log::error('Ha ocurrido un error en GaleriaHomeController: '.$e->getMessage().', Linea: '.$e->getLine());

                return response()->json([
                    'message' => 'Ha ocurrido un error al tratar de obtener los datos.',
                ], 500);
            }
        } else {
            return response()->json('Su usuario no es administrador', 400);
        }
    }

    public function getGaleriaImage($archivo)
    {

        if (Storage::exists('/galeriaProductos/'.$archivo)) {

            /* habilitar si quieres recibir la imagen en streaming  */
            return Storage::response("galeriaProductos/".$archivo);
            //return response()->json(Storage::url('galeri/'.$archivo), 201);
        } else {
            return response()->json('Archivo no encontrado', 404);
        }
    }

    public function destroy($idGaleriaHomeProducto)
    {

        DB::beginTransaction();

        try {
            $galeriaHomeProd = GaleriaHomeProductos::findOrFail($idGaleriaHomeProducto);
            $galeriaHomeProd->delete();

            $response = [
                'msj' => 'Galetia eliminado Correctamente',
            ];

            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en GaleriaHomeController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }

    public function cambiarStatus(Request $request, $idGaleriaHomeProducto)
    {
        $galeriaHomeProd = GaleriaHomeProductos::find($idGaleriaHomeProducto);

        if (is_null($galeriaHomeProd)) {
            $response = [
                'msj' => 'Galeria no existe',
            ];

            return response()->json($response, 404);
        }

        $galeriaHomeProd->fill(['fk_idStatusSistema' => $request->fk_idStatusSistema]);
        $galeriaHomeProd->save();

        $response = [
            'msj'     => 'Status de Galeria actualizada correctamente',
            'galeria' => $galeriaHomeProd,
        ];

        return response()->json($response, 201);
    }
}
