<?php

namespace App\Http\Controllers;

use App\DuracionAlimento;
use App\User;
use Illuminate\Http\Request;

class NotificacionDuracionAlimentoController extends Controller
{
    public function agregarDuracion (Request $request, $idUser)
    {

        //$request->duracion

        $User = User::find($idUser);

        if (!is_null($User)) {

            $this->validate($request, [
                'duracion' => 'required|integer',
            ], [
                'duracion.required' => 'El campo es requerido',
                'duracion.integer' => 'El campo debe ser numerico',
            ]);


            $duracion            = new DuracionAlimento($request->all());
            $duracion->fk_idUser = $idUser;
            $duracion->save();
            $duracion->user;

            $response = [
                'msj' => 'Duracion Agregada correctamente',
                'duracion' => $duracion
            ];

            return response()->json($response, 201);

        } else {

            $response = [
                'msj' => 'Usuario no existe',
            ];

            return response()->json($response, 404);
        }
    }

    public function agregarFechaRecordatorio (Request $request, $idNotificacionDuracionAlimentos)
    {

        //$request->fechaNotificacion

        $nd = DuracionAlimento::find($idNotificacionDuracionAlimentos);

        if (!is_null($nd)) {

            $this->validate($request, [
                'fechaNotificacion' => 'required|date',
            ], [
                'fechaNotificacion.required' => 'El campo es requerido',
                'fechaNotificacion.date' => 'El campo debe ser tipo fecha',
            ]);

            $duracion            = DuracionAlimento::find($idNotificacionDuracionAlimentos);

            if(!is_null($duracion)){
                $duracion->fechaNotificacion=$request->fechaNotificacion;
                $duracion->save();

                $response = [
                    'msj' => 'Fecha de notificación Agregada correctamente',
                    'duracion' => $duracion
                ];

                return response()->json($response, 201);
            }else{
                $response = [
                    'msj' => 'No hay registros con el id: '+$idNotificacionDuracionAlimentos,
                ];

                return response()->json($response, 404);
            }




        }
    }
}
