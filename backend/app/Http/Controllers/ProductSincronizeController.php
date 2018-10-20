<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductSincronizeController extends Controller
{
    // OBTENEMOS TODOS LOS PRODUCTOS DISPONIBLES  EN EL SISTEMA 
    public function getAllByEmailDriver(Request $request){
        $orders = DB::connection('sqlsrv')->select(" SELECT * FROM  Transportes where Email_Transporte = '".$request->email."' "); 
        return response()->json($orders, 200);
        // fk_idSatate

    }
}
