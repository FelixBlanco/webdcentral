<?php

namespace App\Http\Controllers;

use App\Slide;
use Illuminate\Support\Facades\Auth;
use Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SlideController extends Controller {

    public function listar() {

        $slides = Slide::get();
        $slides->each(function($slides) {
            $slides->set_imagen = asset('storage\\slide\\'.$slides->imagen);
            $slides->producto;
            if (! empty($slides->fk_idProducto)) {
                $slides->nameProducto = $slides->producto->nombre;
            }
        });

        $response = [
            'msj'      => 'Lista de slides',
            'producto' => $slides,
        ];

        return response()->json($response, 201);
    }

    public function listarPorId($idSlide) {

        $slides = Slide::findOrFail($idSlide);

        $response = [
            'msj'      => 'Resultado del slide: '.$idSlide,
            'producto' => $slides,
        ];

        return response()->json($response, 201);
    }

    public function createSlides(Request $request) {
      
        if (Auth::user()->fk_idPerfil == 1) {

            $this->validate($request, [
                'titulo'        => 'required',
                'imagen'        => 'image|required|mimes:jpeg,png,jpg,gif,svg',
                'fk_idProducto' => 'required',

            ], [
                'titulo.required'        => 'El titulo es requerido',
                'imagen.image'        => 'La Imagen es requerida',
                'imagen.required'     => 'La Imagen es requerida',
                'imagen.mimes'        => 'Solo jpeg, png, bmp,tiff son soportados',
                'fk_idProducto.required' => 'El producto es requerido',
            ]);

            try {
                DB::beginTransaction();

                $originalImage = $request->imagen;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });


                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = 'png';

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;


                Storage::disk('local')->put('\\slide\\'.$nombre_interno, (string) $thumbnailImage->encode());


                $imagemodel         = new Slide();
                $imagemodel->titulo = $request->titulo;

                if (! empty($request->fk_idProducto)) {
                    $imagemodel->fk_idProducto = $request->fk_idProducto;
                }

                $imagemodel->imagen        = $nombre_interno;
                $imagemodel->fk_idProducto = $request->fk_idProducto;
                $imagemodel->save();

                DB::commit();

                $response = [
                    'msj'         => 'Slides guardada exitosamente',
                    'id_dataBase' => $imagemodel->idSlide,
                    'calidad'     => '2048*2048',
                    'size'        => $size = (Storage::size('\\slide\\'.$nombre_interno) / 1000000).' Mb',
                    'name'        => 'storage\\slide\\'.$nombre_interno,
                ];

                return response()->json($response, 201);

            } catch (\Exception $e) {

                DB::rollback();
                Log::error('Ha ocurrido un error en SlideController: '.$e->getMessage().', Linea: '.$e->getLine());

                return response()->json([
                    'message' => 'Ha ocurrido un error al tratar de obtener los datos.',
                ], 500);
            }
        } else {
            return response()->json('Su usuario no es administrador', 400);
        }

    }

    public function getSlideImage($archivo) {

        if (Storage::exists('\\slide\\'.$archivo)) {

            /* habilitar si quieres recibir la imagen en streaming  */
            return Storage::response("slide\\".$archivo);

            //return response()->json(Storage::url('galeri/'.$archivo), 201);
        } else {
            return response()->json('Archivo no encontrado', 404);
        }
    }

    public function destroy($idSlide) {

        DB::beginTransaction();

        try {
            $slide = Slide::findOrFail($idSlide);
            $slide->delete();

            $response = [
                'msj' => 'Slide eliminado Correctamente',
            ];

            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en SlideController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }
}
