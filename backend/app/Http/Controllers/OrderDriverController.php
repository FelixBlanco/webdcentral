<?php

namespace App\Http\Controllers;

use App\orderBody;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\orderHeader;
use App\Notification;
use App\User;


use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class OrderDriverController extends Controller {

    // OBTENEMOS TODOS LOS PEDIDOS POR CODIGO CHOFER 
    public function getAllByCodeDriver(Request $request) {

        try {
            $rs = null;

            $sql = "";
            if ($request->search != "") {
                $sql = " AND Pedido LIKE '%".$request->search."%' ";
            }

            // POR CHOFER
            if ($request->Codigo_Transporte != "") {
                $sql = $sql." AND Codigo_Transporte = '".$request->Codigo_Transporte."' ";
            }

            // POR CLIENTE 
            if ($request->Codigo_Cliente != "") {
                $sql += $sql." AND Codigo_Cliente = '".$request->Codigo_Cliente."' ";
            }

            $rs = DB::connection('sqlsrv')->select(" SELECT TOP 20 * FROM   VentasporComprobantes  
            where   (EstadoPedido = 'En Transito' 
            or EstadoPedido ='Cerrado') ".$sql."  order by Ruta  ");

            if ($rs) {

                $result = [];
                $orders = [];

                $tempRuta = "Sin Ruta";
                $c        = 0;
                foreach ($rs as $item) {
                    if ($item->Ruta == "") {
                        $item->Ruta = "Sin Ruta";
                    }

                    // si es igual a la aterior 
                    if ((strcasecmp($item->Ruta, $tempRuta) == 0) || $c == 0) {
                        array_push($orders, $item);
                    }

                    if ((strcasecmp($item->Ruta, $tempRuta) != 0) || $c == count($rs) - 1) {
                        $data = [ "Ruta" => $tempRuta, "data" => $orders ];
                        array_push($result, $data);
                        $orders = [];
                    }

                    $tempRuta = $item->Ruta;

                    $c++;

                }


                return response()->json($result, 200);
            } else {
                return response()->json("No existe contenido ", 204);
            }
        } catch (\Exception $e) {
            dd($e);

            return response()->json("Error conectando a el DC", 500);
        }

    }

    // OBTENEMOS  PEDIDOS ACTUALES POR CODIGO CHOFER 
    public function getByCodeDriver(Request $request) {

        try {
            $rs = null;

            $sql = "";
            if ($request->search != "") {
                $sql = " AND Pedido LIKE '%".$request->search."%' ";
            }

            // POR CHOFER
            if ($request->Codigo_Transporte != "") {
                $sql = $sql." AND Codigo_Transporte = '".$request->Codigo_Transporte."' ";
            }


            $rs = DB::connection('sqlsrv')->select(" SELECT TOP 20 * FROM   VentasporComprobantes  
            where   EstadoPedido != 'Reparto' ".$sql."  order by Ruta  ");

            if ($rs) {

                $result = [];
                $orders = [];

                $tempRuta = "Sin Ruta";
                $c        = 0;
                foreach ($rs as $item) {
                    if ($item->Ruta == "") {
                        $item->Ruta = "Sin Ruta";
                    }

                    // si es igual a la aterior 
                    if ((strcasecmp($item->Ruta, $tempRuta) == 0) || $c == 0) {
                        array_push($orders, $item);
                    }

                    if ((strcasecmp($item->Ruta, $tempRuta) != 0) || $c == count($rs) - 1) {
                        $data = [ "Ruta" => $tempRuta, "data" => $orders ];
                        array_push($result, $data);
                        $orders = [];
                    }

                    $tempRuta = $item->Ruta;

                    $c++;

                }


                return response()->json($result, 200);
            } else {
                return response()->json("No existe contenido ", 204);
            }
        } catch (\Exception $e) {
            dd($e);

            return response()->json("Error conectando a el DC", 500);
        }
    }

    // OBTENEMOS PRODUCTOS DE UN  PEDIDOS ACTUALES POR CODIGO PEDIDO 
    public static function getProductByPedido(Request $request) {

        try {
            $rs = null;
            $rs = DB::connection('sqlsrv')->select("  SELECT  *  FROM VentasporProductos
            where Pedido = ".$request->Pedido." ");


            if ($rs) {
                return response()->json($rs, 200);
            } else {
                return response()->json("No existe contenido ", 204);
            }
        } catch (\Exception $e) {
            //dd($e);
            return response()->json("Error conectando a el DC", 500);
        }
    }


    // cambio esta de un pedido //
    public function chagueEstadoPedido(Request $request) {

        try {


            $order = orderHeader::where("Numero_Pedido", "=", $request->Numero_Pedido)->first();

            if ($order) {
                $order->Estado_Pedido   = $request->Estado_Pedido;
                $order->fk_idStateOrder = $request->fk_idStateOrder;
                $order->save();
            }

            DB::connection('sqlsrv')->update("  UPDATE EncabezadosVentas_APP
             set Estado_Pedido = '".$request->Estado_Pedido."' where Numero_Pedido = '".$request->Numero_Pedido."' ");


            // ENVIO DE NOTIFICACION A LOS CLIENTE DE FIREBASE //
            if ($order) {
                if ($order->fk_idStateOrder == 5) {
                    if ($order->fk_idUserClient > 0) {

                        $user = User::select("tokenFirebase")->findOrFail($order->fk_idUserClient);

                        $data = [
                            'descriptionNotification' => 'Confirme la recepcion de su pedido #'.$order->Numero_Pedido,
                            'idSecctionApp'           => 4 // Pedidos
                        ];

                        NotificationController::sendNotificationFb('Su pedido fue entregado', $data, $user->tokenFirebase);

                        $notifications                          = new Notification();
                        $notifications->titleNotification       = 'Su pedido fue entregado';
                        $notifications->descriptionNotification = 'Confirme la recepcion de su pedido #'.$order->Numero_Pedido;
                        $notifications->fk_idSecctionApp        = 4;// Pedidos
                        $notifications->fk_idUser               = $order->fk_idUserClient;// Pedidos

                        $notifications->save();
                    }
                }
            }

            return response()->json("Pedido actualizado ", 200);

        } catch (\Exception $e) {
            dd($e);

            return response()->json("Error conectando a el DC", 500);
        }
    }

    // Finalizar Pedido
    public function finishPedido(Request $request) {

        try {


            $order = orderHeader::where("Numero_Pedido", "=", $request->Numero_Pedido)->first();

            if ($order) {
                $order->Estado_Pedido   = $request->Estado_Pedido;
                $order->fk_idStateOrder = $request->fk_idStateOrder;
                $order->stars           = $request->stars;
                $order->save();
            }

            DB::connection('sqlsrv')->update("  UPDATE EncabezadosVentas_APP
             set Estado_Pedido = '".$request->Estado_Pedido."'
             , stars = ".$request->stars."
              where Numero_Pedido = '".$request->Numero_Pedido."' ");

            return response()->json("Pedido actualizado ", 200);

        } catch (\Exception $e) {
            dd($e);

            return response()->json("Error conectando a el DC", 500);
        }
    }

    // devolucion  de un prodcto pedido //
    public function devolutionProduct(Request $request) {

        try {
            DB::connection('sqlsrv')->update("  UPDATE DetallesVentas_APP
             set Devolucion_Producto = '".$request->Devolucion_Producto."' 
             where Numero_Pedido = '".$request->Numero_Pedido."'
             and Codigo_Producto = '".$request->Codigo_Producto."'
              ");

            $request->Pedido = $request->Numero_Pedido;

            return response()->json($this->getProductByPedido($request)->original, 200);

        } catch (\Exception $e) {
            //  dd($e);
            return response()->json("Error conectando a el DC", 500);
        }
    }


    /*
    CREA PEDIDO
    */

    // HEADER
    public static function addHeader(orderHeader $request) {
        try {
            $mytime = Carbon::now();

            DB::connection('sqlsrv')->insert("  INSERT INTO EncabezadosVentas_APP 
            (   Email_Cliente,
                Fecha_Pedido,
                Numero_Pedido,
                Estado_Pedido,
                Domicilio_Entrega,
                Codigo_Postal,
                comentaryClient) VALUES(
                 $request->emailEnvio   
                 $mytime->toDateTimeString(),
                 $request->Numero_Pedido,
                 'Solicitado',
                 $request->Domicilio_Entrega,
                 $request->Codigo_Postal,
                 $request->comentaryClient
              )");

            return response()->json("Pedido creado ", 200);

        } catch (\Exception $e) {
            // dd($e);
            return response()->json("Error conectando a el DC", 500);
        }
    }

    // BODY
    public static function addBody(orderBody $item) {
        try {
            //$mytime = Carbon::now();

            DB::connection('sqlsrv')->insert("  INSERT INTO DetalleEncabezadosVentas_APP 
                (   Codigo_Producto,
                    Cantidad_Producto,
                    PrecioUnitario_Producto,
                    PorcentajeDescuento_Producto,
                    Devolucion_Producto,
                    Numero_Pedido,
                ) VALUES(
                    $item->codeProdSys,
                    $item->Cantidad_Producto,
                    $item->PrecioUnitario_Producto,
                    $item->PorcentajeDescuento_Producto,
                    $item->Devolucion_Producto,
                    $item->Numero_Pedido
                )");


            return response()->json("Poductos Agregados ", 200);

        } catch (\Exception $e) {
            // dd($e);
            return response()->json("Error conectando a el DC", 500);
        }
    }


    // OBTENEMOS TODOS LOS PEDIDOS POR CODIGO CLIENTE
    public function getAllByCodeCliente(Request $request) {

        try {
            $rs = null;

            $sql = "";
            if ($request->search != "") {
                $sql = " AND Pedido LIKE '%".$request->search."%' ";
            }


            // POR CLIENTE 
            if ($request->Codigo_Cliente != "") {
                $sql = $sql." AND Codigo_Cliente = ".$request->Codigo_Cliente." ";
            }

            $rs = DB::connection('sqlsrv')->select(" SELECT TOP 20 * FROM   VentasporComprobantes  
            where   (EstadoPedido = 'En Transito' 
            or EstadoPedido ='Cerrado' or EstadoPedido ='En Reparto' or 
            EstadoPedido ='Visto' ) ".$sql."  order by Fecha_EncabezadoVenta  ");

            if ($rs) {
                return response()->json($rs, 200);
            } else {
                return response()->json("No existe contenido ", 204);
            }
        } catch (\Exception $e) {
            dd($e);

            return response()->json("Error conectando a el DC", 500);
        }

    }

}
