<?php

namespace App\Http\Controllers;

use App\orderHeader;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Image;

class OrderHeaderController extends Controller
{

    public function añadir (Request $request)
    {
        // opcional comentaryClient

        $this->validate($request, [
            //'Domicilio_Entrega' => 'required',
            //'Codigo_Postal' => 'required',
            //'monto_total'       => 'required',
            //'comentarioFinal'   => 'required',
            'metodoEntrega' => 'required',
            //'disponibilidadHr'                 => 'required',
            /*'CUIT'                             => 'required',
            'CUITrazonSocial'                  => 'required',
            'CUITDomicilioFidcal'              => 'required',
            'metodoPago'                       => 'required',
            'comprobanteDepositoTransferencia' => 'required',*/
            //'fk_idTipoFactura'                 => 'required',
            //'localidad'                        => 'required',

        ], [
            //'Domicilio_Entrega.required' => 'El campo es requerido',
            //'Codigo_Postal.required' => 'El campo es requerido',
            //'monto_total.required'       => 'El campo es requerido',
            //'comentarioFinal.required'   => 'El campo es requerido',
            'metodoEntrega.required' => 'El campo es requerido',
            //'disponibilidadHr.required'                 => 'El campo es requerido',
            /*'CUIT.required'                             => 'El campo es requerido',
            'CUITrazonSocial.required'                  => 'El campo es requerido',
            'CUITDomicilioFidcal.required'              => 'El campo es requerido',
            'metodoPago.required'                       => 'El campo es requerido',
            'comprobanteDepositoTransferencia.required' => 'El campo es requerido',/*
            //'fk_idTipoFactura.required'                 => 'El campo es requerido',
            //'localidad.required'                        => 'El campo es requerido',*/
        ]);

        DB::beginTransaction();

        try {


            $Numero_Pedido_max = orderHeader::select('idOrderHeader')->orderby('idOrderHeader', 'desc')->first();

            if (is_null($Numero_Pedido_max)) {
                $Numero_Pedido = '1-' . Carbon::now()->format('Ymd');
            } else {
                $Numero_Pedido = ($Numero_Pedido_max->idOrderHeader + 1) . '-' . Carbon::now()->format('Ymd');
            }

            $OB = new orderHeader($request->all());

            if (isset($request->comprobanteDepositoTransferencia) && $request->comprobanteDepositoTransferencia != "null") {

                $this->validate($request, [
                    'comprobanteDepositoTransferencia' => 'image|required|mimes:jpeg,png,jpg,gif,svg',
                ], [
                    'comprobanteDepositoTransferencia.required' => 'El campo es requerido',
                    'comprobanteDepositoTransferencia.image' => 'La imagen debe tener el formato jpeg, pnp, gif, svg',
                ]);


                /*para el comprobante*/
                $originalImage = $request->comprobanteDepositoTransferencia;

                $thumbnailImage = Image::make($originalImage);
                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });
                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = 'png';
                //$extension = $originalImage->getClientOriginalExtension();
                $nombre_interno1 = str_replace('.' . $extension, '', $nombre_publico);
                $nombre_interno1 = str_slug($nombre_interno1, '-') . '-' . time() . '-' . strval(rand(100, 999)) . '.' . $extension;
                Storage::disk('local')->put('\\comprobanteDepositoTransferencia\\' . $nombre_interno1, (string)$thumbnailImage->encode());
                /*para el comprobante*/

                $OB->comprobanteDepositoTransferencia = $nombre_interno1;
            }


            if (is_null($request->stars)) {
                $OB->stars = 0;
            }

            if (is_null($request->monto_total)) {
                $OB->monto_total = 0;
            }


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

            if (!is_null($OB->fk_idTipoFactura)) {
                $OB->tipoFactura;
            }

            //OrderDriverController::addHeader($OB);
            $response = [
                'msj' => 'Pedido Creado',
                'OB' => $OB,
                'set_imagen' => asset('storage\\comprobanteDepositoTransferencia\\'.$OB->comprobanteDepositoTransferencia),
            ];
            DB::commit();

            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en OrderHeaderController: ' . $e->getMessage() . ', Linea: ' . $e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function listarPorIdUsuario ($fk_idUser)
    {

        $orders = orderHeader::select("*")->where('fk_idStateOrder', '=', '5')->where('fk_idUserClient', $fk_idUser)->get();

        $response = [
            'msj' => 'Pedidos que faltan calificar por cliente ',
            'orders' => $orders,
        ];

        return response()->json($response, 200);
    }

    public function safePago (Request $request)
    {


        DB::beginTransaction();
        try {


            DB::connection('mysql')->insert("  INSERT INTO tb_history_mp 
            (data,
            fk_idOrderHeader) VALUES(
                 '$request->data',  
                 $request->id
              )");

            return response()->json("Registro creado", 200);

        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en NotificationController: ' . $e->getMessage() . ', Linea: ' . $e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }


    }

    public function getDataPay (Request $request)
    {


        DB::beginTransaction();
        try {

            $obj = [
                "clienteid" => env('MP_clienteid', ''),
                "clientesecret" => env('MP_clientesecret', ''),
                "currency_id" => env('MP_currency_id', ''),
                "unit_price" => $request->unit_price,
                "id" => $request->idOrderHeader,
                "title" => "Compra Pedido " . $request->Numero_Pedido,
                "uri" => env('MP_URI', ''),
            ];


            return response()->json($obj, 200);

        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en NotificationController: ' . $e->getMessage() . ', Linea: ' . $e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }


    }


}
