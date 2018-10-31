<?php

namespace App\Http\Controllers;

use App\orderBody;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderBodyController extends Controller {

    public function añadir(Request $request) {

        $this->validate($request, [
            'fk_idOrderHeader'             => 'required',
            'codeProdSys'                  => 'required',
            'Cantidad_Producto'            => 'required',
            'PrecioUnitario_Producto'      => 'required',
            'fk_idProducto'                => 'required',
        ], [
            'fk_idOrderHeader.required'             => 'El campo es requerido',
            'codeProdSys.required'                  => 'El campo es requerido',
            'Cantidad_Producto.required'            => 'El campo es requerido',
            'PrecioUnitario_Producto.required'      => 'El campo es requerido',
            'fk_idProducto.required'                => 'El campo es requerido',
        ]);

        DB::beginTransaction();

        try {

            $OH = new orderBody($request->all());

            $OH->save();
            $OH->orderHeader;

            $response = [
                'msj'  => 'OrderBody Creada exitosamente',
                'user' => $OH,
            ];
            DB::commit();

            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en OrderBodyController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }
}
