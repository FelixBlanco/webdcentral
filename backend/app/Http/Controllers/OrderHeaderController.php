<?php

namespace App\Http\Controllers;

use App\orderHeader;
use App\Producto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderHeaderController extends Controller {

    public function añadir(Request $request) {

        // opcional comentaryClient

        $this->validate($request, [
            'Domicilio_Entrega' => 'required',
            'Codigo_Postal'     => 'required',
            'stars'             => 'required',
        ], [
            'Domicilio_Entrega.required' => 'El campo es requerido',
            'Codigo_Postal.required'     => 'El campo es requerido',
            'stars.required'             => 'El campo es requerido',
        ]);

        DB::beginTransaction();

        try {
            $Numero_Pedido_max = orderHeader::max('Numero_Pedido');
            $Numero_Pedido='';

            if (is_null($Numero_Pedido_max)) {
                $Numero_Pedido = 1;
            }

                $Numero_Pedido = $Numero_Pedido_max + 1;

                $OB                  = new orderHeader($request->all());

                $OB->Numero_Pedido   = $Numero_Pedido;
                $OB->Estado_Pedido   = 'Abierto';
                $OB->fk_idUserClient = Auth::user()->id;
                $OB->Email_Cliente   = Auth::user()->email;
                $OB->fk_idUserDriver = 0; //esto no agarra valores nulos por lo que le asigne 0 por default

                $OB->Fecha_Pedido    = Carbon::now()->toDateString();
                $OB->fk_idStateOrder = 1;

                $OB->save();
                $OB->user;
                $OB->state;

                $response = [
                    'msj'  => 'OrderHeader Creada exitosamente',
                    'OB' => $OB,
                ];
                DB::commit();

                return response()->json($response, 201);



        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en OrderHeaderController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }
}
