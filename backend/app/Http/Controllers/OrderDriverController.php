<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class OrderDriverController extends Controller
{

    // OBTENEMOS TODOS LOS PEDIDOS POR EMAIL CHOFER 
    public function getAllByEmailDriver(Request $request){
        $orders = DB::connection('sqlsrv')->select(" SELECT * FROM  Transportes where Email_Transporte = '".$request->email."' "); 
        return response()->json($orders, 200);

    }
}
