<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ConfigFooter;

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

            $c->save();
            $response = [
                'msj' => 'Footer Creado',
            ];

            return response()->json($response, 201);
        } else {
            $d->direccion   = $request->direccion;
            $d->nroContacto = $request->nroContacto;
            $d->mail1       = $request->mail1;
            $d->mail2       = $request->mail2;
            $d->direccion   = $request->direccion;
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
                'msj' => 'Footer Actualizado',
            ];

            return response()->json($response, 201);
        }
    }
}
