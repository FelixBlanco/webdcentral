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

        $this->validate($request, [
            'Domicilio_Entrega' => 'required',
            'Codigo_Postal'     => 'required',
            'fk_idProducto'     => 'required',
        ], [
            'Domicilio_Entrega.required' => 'El campo es requerido',
            'Codigo_Postal.required'     => 'El campo es requerido',
            'fk_idProducto.required'     => 'El campo es requerido',
        ]);

        DB::beginTransaction();

        try {
            $producto = Producto::findOrFail($request->fk_idProducto);

            $Numero_Pedido_max = orderHeader::max('idOrderHeader');

            if (! is_null($Numero_Pedido_max)) {

                $Numero_Pedido = 'P-'.$Numero_Pedido_max + 1;
            } else {
                $Numero_Pedido = 'P-1';
                if (is_null($producto)) {

                    $response = [
                        'msj' => 'No exise el producto: '.$request->fk_idProducto,
                    ];

                    return response()->json($response, 400);
                } else {

                    $OB                = new orderHeader($request->all());
                    $OB->codeProdSys   = $producto->codeProdSys;
                    $OB->Numero_Pedido = $Numero_Pedido;
                    $OB->Estado_Pedido = 'Abierto';
                    $OB->fk_idUser     = Auth::user()->id;

                    $OB->Fecha_Pedido    = Carbon::now()->toDateString();
                    $OB->fk_idStateOrder = 1;

                    $OB->save();
                    $OB->user;
                    $OB->state;

                    $response = [
                        'msj'  => 'OrderHeader Creada exitosamente',
                        'user' => $OB,
                    ];
                    DB::commit();

                    return response()->json($response, 201);
                }
            }


        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en OrderHeaderController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }
}
