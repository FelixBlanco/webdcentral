<?php

namespace App\Http\Controllers;

use App\Suscripcion;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

            $response = [
                'msj'         => 'Suscripcion Creada Satisfactoriamente',
                'suscripcion' => $sus,
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
            $sus = Suscripcion::findOrFail($id);


            $sus->fill([ 'fk_idStatusSistema' => $request->fk_idStatusSistema ]);


            $response = [
                'msj'         => 'Status de la suscripcion cambiada',
                'suscripcion' => $sus,
            ];

            $sus->save();
            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en SuscripcionController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function cancelarSus($id) {

        $sus = Suscripcion::findOrFail($id);
        $sus->fill([ 'fk_idStatusSistema' => 2 ]);
        $sus->save();

        $response = [
            'msj'         => 'Suscripcion cancelada',
            'suscripcion' => $sus,
        ];

        return response()->json($response, 200);
    }

}
