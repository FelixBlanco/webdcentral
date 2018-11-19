<?php

namespace App\Http\Controllers;

use App\Mail\SuscripcionMail;
use App\Suscripcion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SuscripcionController extends Controller {

    public function nuevaSus(Request $request) {

        $this->validate($request, [
            'email' => 'required|unique:tb_suscripcions,email,'.$request->idSuscripcion.',idSuscripcion',
        ], [
            'email.unique'   => 'Este Email ya se encuentra en uso',
            'email.email'    => 'El Email debe de tener un formato ejemplo@ejemplo.com',
            'email.required' => 'El Email es requerido',
        ]);

        DB::beginTransaction();

        try {

            $sus                     = new Suscripcion($request->all());
            $sus->fk_idStatusSistema = 1;

            $sus->save();


            Mail::to($request->email)->send(new SuscripcionMail($sus));

            $response = [
                'msj'         => 'Suscripcion Creada Satisfactoriamente',
                'suscripcion' => [ 'id'      => $sus->idSuscripcion,
                                   'email'   => $sus->email,
                                   'estatus' => $sus->estatusSitema->descripcion ],
            ];
            DB::commit();


            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en SuscripcionController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function cambiarStatusSus(Request $request, $id) {

        $this->validate($request, [
            'fk_idStatusSistema' => 'required',
        ], [
            'fk_idStatusSistema.required' => 'El estatus es requerido',
        ]);

        DB::beginTransaction();

        try {

            $sus = Suscripcion::find($id);
            if ($sus) {
                $sus->fill([ 'fk_idStatusSistema' => $request->fk_idStatusSistema ]);
                $response = [
                    'msj'         => 'Status de la suscripcion cambiada',
                    'suscripcion' => [ 'id'      => $sus->idSuscripcion,
                                       'email'   => $sus->email,
                                       'estatus' => $sus->estatusSitema->descripcion ],
                ];

                $sus->save();
                DB::commit();

                return response()->json($response, 200);
            } else {
                $response = [
                    'msj' => 'No existe la suscripcion con ese id',
                ];

                return response()->json($response, 404);
            }

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en SuscripcionController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function cancelarSus(Request $request, $id) {

        $this->validate($request, [
            'motivoDeCancelacion' => 'required',
        ], [
            'motivoDeCancelacion.required' => 'El motivo de la cancelación es requerido',
        ]);


        $sus = Suscripcion::find($id);

        if ($sus) {
            $sus->fill([ 'fk_idStatusSistema' => 2 ]);
            $sus->save();

            $response = [
                'msj'         => 'Suscripcion cancelada',
                'suscripcion' => [ 'id'      => $sus->idSuscripcion,
                                   'email'   => $sus->email,
                                   'estatus' => $sus->estatusSitema->descripcion,
                                   'motivo'  => $sus->motivoDeCancelacions ],
            ];

            return response()->json($response, 200);
        } else {
            $response = [
                'msj' => 'No existe la suscripcion con ese id',
            ];

            return response()->json($response, 404);
        }
    }

    public function listarSuscripciones() {

        $sus = Suscripcion::where('fk_idStatusSistema', 1)->get();

        $response = [
            'msj'         => 'Suscripcion',
            'suscripcion' => $sus->each(function($sus) {
                                    $sus->estatusSitema;
                                }),
        ];
        return response()->json($response, 200);
    }

    public function listarSuscripcionesCanceladas() {

        $sus = Suscripcion::where('fk_idStatusSistema', 2)->get();

        $response = [
            'msj'         => 'Suscripciones canceladas',
            'suscripcion' => $sus->each(function($sus) {
                $sus->estatusSitema;
            }),
        ];
        return response()->json($response, 200);
    }

}
