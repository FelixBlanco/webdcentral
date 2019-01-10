<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ConfigFooter;
use Illuminate\Support\Facades\Storage;
use Image;

class ConfigFooterController extends Controller {

    public function getInfo() {
        return ConfigFooter::first();
    }

    public function updateInfo(Request $request) {
        // Como se supone que estamos editanto,
        // vamos a dejar el unico registro
        // para editar

        $d = ConfigFooter::first();

        if (empty($d)) { // Caso de estar vacio

            $this->validate($request, [
                'direccion'   => 'required',
                'nroContacto' => 'required',
                'mail1'       => 'required|email',
                //'mail2'       => 'required',
                'latitud'     => 'required',
                'longitud'    => 'required',
                'whatsApp1'   => 'required',
                //'whatsApp2'   => 'required',
                //'horarios'    => 'required',
                //'subtes'      => 'required',
                //'colectivos'  => 'required',
                //'avenidas'    => 'required',
                //'listaPrecio' => 'required|integer|between:1,9',
            ], [
                'direccion'            => 'El campo es requerido',
                'nroContacto.required' => 'El campo es requerido',
                'mail1.required'       => 'El campo es requerido',
                'mail1.email'          => 'El campo no tiene el formado de correo valido',
                //'mail2.required'       => 'El campo es requerido',
                'latitud.required'     => 'El campo es requerido',
                'longitud.required'    => 'El campo es requerido',
                'whatsApp1.required'   => 'El campo es requerido',
                //'whatsApp2.required'   => 'El campo es requerido',
                //'horarios.required'    => 'El campo es requerido',
                //'subtes.required'      => 'El campo es requerido',
                //'colectivos.required'  => 'El campo es requerido',
                //'avenidas.required'    => 'El campo es requerido',
                //'listaPrecio.between'  => 'El rango para la lista de precios es :min - :max',
            ]);

            $c = new ConfigFooter($request->all());

            if (is_null($request->imagen)) {
            } else {
                $originalImage = $request->imagen;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $c->imagen = $nombre_interno;
            }

            if (is_null($request->img_envio_1)) {
            } else {
                $originalImage = $request->img_envio_1;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->img_envio_1 = $nombre_interno;
            }

            if (is_null($request->img_envio_2)) {
            } else {
                $originalImage = $request->img_envio_2;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->img_envio_2 = $nombre_interno;
            }

            if (is_null($request->img_envio_3)) {
            } else {
                $originalImage = $request->img_envio_3;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->img_envio_3 = $nombre_interno;
            }

            if (is_null($request->img_como_comprar)) {
            } else {
                $originalImage = $request->img_como_comprar;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->img_como_comprar = $nombre_interno;
            }

            $c->save();
            $response = [
                'msj'        => 'Footer Creado',
                'set_imagen' => asset('storage\\imagenFooter\\'.$c->imagen),
            ];

            return response()->json($response, 201);
        } else {
            $d->direccion   = $request->direccion;
            $d->nroContacto = $request->nroContacto;
            $d->mail1       = $request->mail1;
            $d->mail2       = $request->mail2;
            $d->latitud     = $request->latitud;
            $d->longitud    = $request->longitud;
            $d->whatsApp1   = $request->whatsApp1;
            $d->whatsApp2   = $request->whatsApp2;

            $d->horarios   = $request->horarios;
            $d->subtes     = $request->subtes;
            $d->colectivos = $request->colectivos;
            $d->avenidas   = $request->avenidas;

            $d->desde             = $request->desde;
            $d->hasta             = $request->hasta;
            $d->url_mercado_libre = $request->url_mercado_libre;
            $d->link_otra_pagina  = $request->link_otra_pagina;
            $d->url_app_store     = $request->url_app_store;
            $d->url_google_play   = $request->url_google_play;
            $d->url_mercadopago   = $request->url_mercadopago;

            $d->img_envio_1      = $request->img_envio_1;
            $d->img_envio_2      = $request->img_envio_2;
            $d->img_envio_3      = $request->img_envio_3;
            $d->img_como_comprar = $request->img_como_comprar;

            if (is_null($request->imagen)) {
            } else {
                $originalImage = $request->imagen;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->imagen = $nombre_interno;
            }

            if (is_null($request->img_envio_1)) {
            } else {
                $originalImage = $request->img_envio_1;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->img_envio_1 = $nombre_interno;
            }

            if (is_null($request->img_envio_2)) {
            } else {
                $originalImage = $request->img_envio_2;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->img_envio_2 = $nombre_interno;
            }

            if (is_null($request->img_envio_3)) {
            } else {
                $originalImage = $request->img_envio_3;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->img_envio_3 = $nombre_interno;
            }

            if (is_null($request->img_como_comprar)) {
            } else {
                $originalImage = $request->img_como_comprar;

                $thumbnailImage = Image::make($originalImage);

                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });

                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();

                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

                Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $d->img_como_comprar = $nombre_interno;
            }

            if (! is_null($request->listaPrecio)) {


                $this->validate($request, [
                    'listaPrecio' => 'integer|between:1,9',
                ], [
                    'listaPrecio.between' => 'El rango para la lista de precios es :min - :max',
                ]);

                $d->listaPrecio = $request->listaPrecio;
            }


            $d->save();

            $response = [
                'msj'        => 'Footer Actualizado',
                'set_imagen' => asset('storage\\imagenFooter\\'.$d->imagen),
            ];

            return response()->json($response, 201);
        }
    }

    public function addImagenFooter(Request $request) {

        $c = ConfigFooter::first();

        if (is_null($request->imagen)) {

            if (! empty($c)) { // Caso de estar vacio
                $response = [
                    'set_imagen' => asset('storage\\imagenFooter\\'.$c->imagen),
                ];

                return response()->json($response, 201);
            } else {
                $response = [
                    'msj' => 'No existe imagen en footer',
                ];

                return response()->json($response, 404);
            }

        } else {
            if (empty($c)) { // Caso de estar vacio
                $response = [
                    'msj' => 'No existe footer, 1ero configure footer',
                ];

                return response()->json($response, 404);
            }

            $originalImage = $request->imagen;

            $thumbnailImage = Image::make($originalImage);

            $thumbnailImage->fit(2048, 2048, function($constraint) {
                $constraint->aspectRatio();
            });

            $nombre_publico = $originalImage->getClientOriginalName();
            $extension      = $originalImage->getClientOriginalExtension();

            $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
            $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;

            Storage::disk('local')->put('\\imagenFooter\\'.$nombre_interno, (string) $thumbnailImage->encode());

            $c->imagen = $nombre_interno;
        }

        $c->save();
        $response = [
            'msj'        => 'Imagen de footer Creada',
            'set_imagen' => asset('storage\\imagenFooter\\'.$c->imagen),
        ];

        return response()->json($response, 201);
    }
}
