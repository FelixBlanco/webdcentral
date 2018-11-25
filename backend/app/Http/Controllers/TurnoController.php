<?php

namespace App\Http\Controllers;

use App\Mail\TurnosMail;
use App\turno;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TurnoController extends Controller {

    public function add(Request $request) {

        $this->validate($request, [
            'fk_idClasificado'   => 'required',
            'fk_idLocalAdherido' => 'required',
            //'fechaHora'          => 'required',
            'fk_idStatusTurnos'  => 'required',  // 1 Solicitado, 2 Cancelado, 3 Rechazado
            //'fk_idUser'          => 'required',

        ], [
            'fk_idClasificado.required'   => 'El campo es requerido',
            'fk_idLocalAdherido.required' => 'El campo es requerido',
            //'fechaHora.required'          => 'El campo es requerido',
            'fk_idStatusTurnos.required'  => 'El campo es requerido',
            //'fk_idUser.required'          => 'El campo es requerido',

        ]);

        DB::beginTransaction();

        try {

            $turno            = new turno($request->all());
            $turno->fk_idUser = Auth::user()->fk_idPerfil;
            $turno->fechaHora = Carbon::now();

            $turno->save();

            $turno->user;

            $turno->clasificado;
            $turno->localAdherido;

            $response = [
                'msj'   => 'Turno Creado',
                'turno' => $turno,
            ];
            DB::commit();

            Mail::to(Auth::user()->email)->send(new TurnosMail($turno));


            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en TurnoController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function update(Request $request, $idTurnos) {
        DB::beginTransaction();

        try {
            $turno = turno::findOrFail($idTurnos);

            $turno->fill($request->all());

            $response = [
                'msj' => 'Info del Turno actulizada',
            ];
            $turno->save();

            Mail::to(Auth::user()->email)->send(new TurnosMail($turno));
            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en TurnoController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

}
