<?php

namespace App\Http\Controllers;

use App\ConfigFooter;
use Illuminate\Http\Request;

class ConfigFooterController extends Controller
{
    public function getInfo()
    {
        return ConfigFooter::first();
    }

    public function updateInfo(Request $request)
    {

        // Como se supone que estamos editanto,
        // vamos a dejar el unico registro
        // para editar

        $d = ConfigFooter::first();

        if (empty($d)) { // Caso de estar vacio
            $c = new ConfigFooter($request->all());
            $c->save();
        } else {
            $d->direccion = $request->direccion;
            $d->nroContacto = $request->nroContacto;
            $d->mail1 = $request->mail1;
            $d->mail2 = $request->mail2;
            $d->direccion = $request->direccion;
            $d->latitud = $request->latitud;
            $d->longitud = $request->longitud;
            $d->whatsApp1 = $request->whatsApp1;
            $d->whatsApp2 = $request->whatsApp2;

            $d->save();
        }
    }
}
