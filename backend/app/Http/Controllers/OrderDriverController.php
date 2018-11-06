<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class OrderDriverController extends Controller
{

    // OBTENEMOS TODOS LOS PEDIDOS POR CODIGO CHOFER 
    public function getAllByCodeDriver(Request $request){
       
        try{
            $rs = null;
            $rs = DB::connection('sqlsrv')->select(" SELECT TOP 20 * FROM   VentasporComprobantes  
            where Codigo_Transporte = '".$request->Codigo_Transporte."' and EstadoPedido != 'En Transito' order by Ruta  "); 
            
            if($rs){

                $result = array();
                $orders = array();

                $tempRuta = "";
                $c = 0;
                foreach ($rs as $item){
                    if($item->Ruta == ""){
                        $item->Ruta =  "Sin Ruta";
                    }

                    if((strcasecmp($tempRuta, $tempRuta) == 0)  || $c == 0){
                        array_push($orders,$item);
                    }
                
                    if((strcasecmp($tempRuta, $tempRuta) != 0)  || $c == count($rs)-1){
                                        $data = array("Ruta" => $tempRuta , "data" => $orders);
                        array_push($result,$data);
                        $orders = array();
                    }

                    $tempRuta = $item->Ruta;
                    
                    $c++;

                }



                return response()->json($result, 200);
            }else{
                return response()->json("No existe contenido ", 204);
            }
        } catch (\Exception $e) {
            dd($e);

            return response()->json("Error conectando a el DC", 500);
        }

    }

    // OBTENEMOS  PEDIDOS ACTUALES POR CODIGO CHOFER 
    public function getByCodeDriver(Request $request){

        try{
            $rs = null;
            $rs  = DB::connection('sqlsrv')->select(" SELECT TOP 5 * FROM  VentasporComprobantes 
            where Codigo_Transporte = ".$request->Codigo_Transporte." and EstadoPedido != 'Reparto' "); 
           
           if($rs){
                return response()->json($rs, 200);
            }else{
                return response()->json("No existe contenido ", 204);
            }
        } catch (\Exception $e) {
            return response()->json("Error conectando a el DC", 500);
        }
    }

    // OBTENEMOS PRODUCTOS DE UN  PEDIDOS ACTUALES POR CODIGO PEDIDO 
    public function getProductByPedido(Request $request){

        try{
            $rs = null;
            $rs = DB::connection('sqlsrv')->select("  SELECT  *  FROM VentasporProductos
            where Pedido = ".$request->Pedido." "); 


            if($rs){
                return response()->json($rs, 200);
            }else{
                return response()->json("No existe contenido ", 204);
            }
        } catch (\Exception $e) {
            //dd($e);
            return response()->json("Error conectando a el DC", 500);
        }
    }


    
    // cambio esta de un pedido //
    public function chagueEstadoPedido(Request $request){

        try{
            DB::connection('sqlsrv')->update("  UPDATE EncabezadosVentas_APP
             set Estado_Pedido = '".$request->Estado_Pedido."' where Numero_Pedido = '".$request->Numero_Pedido."' "); 

            return response()->json("Pedido actualizado ", 200);
            
        } catch (\Exception $e) {
           // dd($e);
            return response()->json("Error conectando a el DC", 500);
        }
    }

     // devolucion  de un prodcto pedido //
     public function devolutionProduct(Request $request){

        try{
            DB::connection('sqlsrv')->update("  UPDATE DetallesVentas_APP
             set Devolucion_Producto = '".$request->Devolucion_Producto."' 
             where Numero_Pedido = '".$request->Numero_Pedido."'
             and Codigo_Producto = '".$request->Codigo_Producto."'
              "); 

            return response()->json("Pedido actualizado ", 200);
            
        } catch (\Exception $e) {
          //  dd($e);
            return response()->json("Error conectando a el DC", 500);
        }
    }

 
    /*
    CREA PEDIDO
    */

    // HEADER
    public static function addHeader(Request $request){

        try{
            $mytime = Carbon\Carbon::now();

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
    public static function addBody(Request $request){

        try{
            foreach ($request->items as $item){
                $mytime = Carbon\Carbon::now();

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
            }

            return response()->json("Poductos Agregados ", 200);
            
        } catch (\Exception $e) {
           // dd($e);
            return response()->json("Error conectando a el DC", 500);
        }
    }

}
