<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Producto;

use Illuminate\Http\Request;
use App\Http\Controllers\ProductoController;

class ProductSincronizeController extends Controller
{
    // OBTENEMOS TODOS LOS PRODUCTOS DISPONIBLES  EN EL SISTEMA 
    public function sicronizeProduct(Request $request){

        $affectedRows = Producto::where('fk_idSatate', '!=', 3)->update(['fk_idSatate' => 3]);

        $rs = DB::connection('sqlsrv')->select(" SELECT * FROM  VistaProductosAPP "); 
       
        foreach ($rs  as $item) {
          
            $product = array(
            'nombre' => $item->Descripcion_Producto,
            'titulo' => $item->Descripcion_Producto,
            'urlImage' => $item->WebLink_Producto,
            'promocion' => "FALTA",
            'categoria' => $item->Descripcion_TablaGenerica,
            'codeProdSys' => $item->Codigo_Producto,
            'kiloProdcuto' => $item->Kilos_Producto,
            'SubRubro1' => $item->Descripcion_SubRubro1,
            'SubRubro2' => $item->Descripcion_Subrubro2,
            'precioL1' => $item->ListadePrecio1_Producto,
            'precioL2' => $item->ListadePrecio2_Producto,
            'precioL3' => $item->ListadePrecio3_Producto,
            'precioL4' => $item->ListadePrecio4_Producto,
            'precioL5' => $item->ListadePrecio5_Producto,
            'precioL6' => $item->ListadePrecio6_Producto,
            'precioL7' => $item->ListadePrecio7_Producto,
            'precioL8' => $item->ListadePrecio8_Producto,
            'precioL9' => $item->ListadePrecio9_Producto,
            'rubro' => $item->Descripcion_Rubro,
            'marca' => $item->Descripcion_Fabricante,
            'fk_idSatate' => 1,
            'destacado' => 0,
            'isOutstanding' => 0,
            'fechaIsOutstanding' => "");
            ProductoController::create($product);
        }

        $this->sicronizeTags();
        return response()->json("Productos actualizados", 200);

       
        // fk_idSatate

    }

    public function sicronizeTags(){
        $rs = DB::connection('sqlsrv')->select(" SELECT * FROM  VistaProductosAPP "); 
       
        foreach ($rs  as $item) {
            $tag = array(
                'codeProdSys' =>$item->codeProdSys,
                'tag' => $item->tag
            );

            ProductoController::createTag($tag);

        }
    }
}
