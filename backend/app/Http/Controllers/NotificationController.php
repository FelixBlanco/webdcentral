<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Notification;
use Illuminate\Support\Facades\Log;


class NotificationController extends Controller
{

    public function add(Request $request){

        DB::beginTransaction();
        try {

                $Coupons = new Notification();
                $Coupons->titleNotification = $request->titleNotification;
                $Coupons->descriptionNotification = $request->descriptionNotification;
                $Coupons->fk_idSecctionApp = $request->fk_idSecctionApp;
                $Coupons->save();
                DB::commit();


                $response = [
                    'msj'         => 'Notificacion enviada'
                ];

                $data = Array(
                    'descriptionNotification' => @$request->descriptionNotification
                );

                $this->sendNotificationFb($Coupons->titleNotification,$data);

                return response()->json($response, 201);
           
            } catch (\Exception $e) {

                DB::rollback();
                Log::error('Ha ocurrido un error en NotificationController: '.$e->getMessage().', Linea: '.$e->getLine());
    
                return response()->json([
                    'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
                ], 500);
            }
        
        
    }

    //
    public function sendNotificationFb($title,$data,$tokenFB = null){

            $notification = array(
                'title' => $title, // works fine here
                'body' => $data['descriptionNotification'],
                'sound' => 'default',
                'vibrate' =>'default'
            );

            
            if($tokenFB != null){
                    $param = array(
                        "to" => $tokenFB,
                        "notification" => $notification,
                        "data" => $data
                    );
            }else{
                $param = array(
                    "to" => "/topics/all",
                    "notification" => $notification,
                    "data" => $data
                );
            }



            $headers = array
            (
                'Authorization: key=' . env('API_ACCESS_KEY', ''),
                'Content-Type: application/json'
            );

            $ch = curl_init();
            curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
            curl_setopt( $ch,CURLOPT_POST, true );
            curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
            curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
            curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
            curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $param ) );
            $result = curl_exec($ch );
            
            curl_close( $ch );
    
    }
}
