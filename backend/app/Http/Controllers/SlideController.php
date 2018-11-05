<?php

namespace App\Http\Controllers;

use App\Slide;
use Image;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SlideController extends Controller {

    public function listar() {

        $slides = Slide::get();
        $slides->each(function($slides){
            $slides->set_imagen = asset('storage/slide/'.$slides->imagen);
            $slides->producto;
            if (!empty($slides->fk_idProducto)) {
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
        $this->validate($request, [
            'titulo' => 'required',
            'imagen' => 'required',
        ], [
            'titulo.required' => 'El titulo es requerido',
            'imagen.required'  => 'La imagen es requerida',

        ]);


        DB::beginTransaction();
        try {

            if ($request->user()->fk_idPerfil == 1) {

                $this->validate($request, [
                    'imagen' => 'image|required|mimes:jpeg,png,jpg,gif,svg',
                ]);


                $originalImage = $request->imagen;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });


                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;



                Storage::disk('local')->put('/slide/'.$nombre_interno, (string) $thumbnailImage->encode());


                $imagemodel         = new Slide();
                $imagemodel->titulo = $request->titulo;

                if (!empty($request->fk_idProducto)) {
                    $imagemodel->fk_idProducto = $request->fk_idProducto;
                }

                $imagemodel->imagen = $nombre_interno;
                $imagemodel->save();


                DB::commit();

                $response = [
                    'msj'         => 'Slides guardada exitosamente',
                    'id_dataBase' => $imagemodel->idSlide,
                    'calidad'     => '2048*2048',
                    'size'        => $size = (Storage::size('/slide/'.$nombre_interno) / 1000000).' Mb',
                    'name'        => '/slide/'.$nombre_interno,
                ];

                return response()->json($response, 201);
            } else {
                response()->json('Su usuario no es administrador', 400);
            }

        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en SlideController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de obtener los datos.',
            ], 500);
        }


    }

    public function getSlideImage($archivo) {

        if (Storage::exists('/slide/'.$archivo)) {

            /* habilitar si quieres recibir la imagen en streaming  */
            return Storage::response("slide/".$archivo);

            //return response()->json(Storage::url('galeri/'.$archivo), 201);
        } else {
            return response()->json('Archivo no encontrado', 404);
        }
    }
}
