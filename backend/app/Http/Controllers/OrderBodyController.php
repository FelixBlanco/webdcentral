<?php

namespace App\Http\Controllers;

use App\orderBody;
use App\orderHeader;
use App\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderBodyController extends Controller {

    public function añadir(Request $request, $fk_idOrderHeader) {

        DB::beginTransaction();

        if (! is_null($fk_idOrderHeader)) {

            $OH = orderHeader::find($fk_idOrderHeader);

            if (! is_null($OH)) {

                foreach ($request->items as $item) {

                    //para validar un arreglo que no es Request

                    $this->validate($request->merge($item), [
                        'codeProdSys'                  => 'required',
                        'Cantidad_Producto'            => 'required',
                        'PrecioUnitario_Producto'      => 'required',
                        'PorcentajeDescuento_Producto' => 'required',
                        'Devolucion_Producto'          => 'required',
                        'Numero_EncabezadoVenta'       => 'required',
                        //'fk_idProducto'                => 'required',
                    ], [
                        'codeProdSys.required'                  => 'El campo es requerido',
                        'Cantidad_Producto.required'            => 'El campo es requerido',
                        'PrecioUnitario_Producto.required'      => 'El campo es requerido',
                        'PorcentajeDescuento_Producto.required' => 'El campo es requerido',
                        'Devolucion_Producto.required'          => 'El campo es requerido',
                        'Numero_EncabezadoVenta.required'       => 'El campo es requerido',
                        //'fk_idProducto.required'                => 'El campo es requerido',
                    ]);

                    try {
                        $n_prod = new orderBody($item);
                        if (! isset($item['fk_idProducto'])) {
                            $p = Producto::where('codeProdSys', $item['codeProdSys'])->first();
                            if (! is_null($p)) {
                                $n_prod->fk_idProducto = $p->idProducto;
                            }
                        }
                        $n_prod->fk_idOrderHeader = $fk_idOrderHeader;
                        $n_prod->save();
                        $n_prod->orderHeader;
                        $respo[] = $n_prod;

                    } catch (\Exception $e) {

                        DB::rollback();
                        Log::error('Ha ocurrido un error en OrderBodyController: '.$e->getMessage().', Linea: '.$e->getLine());

                        return response()->json([
                            'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
                        ], 500);
                    }

                }
                OrderDriverController::addBody($request);

                $response = [
                    'msj'               => 'Cuerpo de la orden: '.$fk_idOrderHeader.', creada exitosamente',
                    'cantidad agregado' => count($respo),
                ];

                DB::commit();

                return response()->json($response, 201);

            } else {

                $response = [
                    'msj' => 'El id de la orden no existe',
                ];

                return response()->json($response, 404);
            }

        } else {

            $response = [
                'msj' => 'Falta el id de la orden',
            ];

            return response()->json($response, 404);
        }


    }

    public function listarProductosBodyPorIdOrferHeader($fk_idOrderHeader) {

        $productos = orderBody::where('fk_idOrderHeader', $fk_idOrderHeader)->get();

        return response()->json($productos, 201);
    }

    public function historialVentas($id_cliente) {

        $th = orderHeader::where('fk_idUserClient', $id_cliente)->with('orderBody')->get();

        return response()->json($th, 201);
    }
}
