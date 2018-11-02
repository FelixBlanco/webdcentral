<?php

namespace App\Http\Controllers;

use App\orderBody;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderBodyController extends Controller {

    public function añadir(Request $request,$fk_idOrderHeader) {
        dd($request->all());

        /*$this->validate($request, [
            'codeProdSys'                  => 'required',
            'Cantidad_Producto'            => 'required',
            'PrecioUnitario_Producto'      => 'required',
            'fk_idProducto'                => 'required',
        ], [
            'codeProdSys.required'                  => 'El campo es requerido',
            'Cantidad_Producto.required'            => 'El campo es requerido',
            'PrecioUnitario_Producto.required'      => 'El campo es requerido',
            'fk_idProducto.required'                => 'El campo es requerido',
        ]);*/

        foreach ($request->items as $item){

            DB::beginTransaction();

            try {

                $OH = new orderBody($item);

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


}
