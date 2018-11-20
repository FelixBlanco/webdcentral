<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Notification;
use Illuminate\Support\Facades\Log;


class NotificationController extends Controller {

    public function listar() {

        $noti     = Notification::get();
        $response = [
            'msj'    => 'Lista de notificaciones',
            'notifi' => $noti,
        ];

        return response()->json($response, 201);

    }

    public function getByIdUser($idUser) {
        $noti     = Notification::where("fk_idUser", "=", $idUser)
            ->orWhere("fk_idUser", "=", '')
            ->get();
        $response = [
            'msj'    => 'Lista de notificaciones',
            'notifi' => $noti,
        ];

        return response()->json($response, 201);

    }


    public function confirm($idNotification) {
        $rs = Notification::findOrFail($idNotification);
        $rs->fill([ 'isConfirm' => 1 ]);
        $rs->save();

    }


    public function add(Request $request) {

        $this->validate($request, [
            'titleNotification'       => 'required',
            'descriptionNotification' => 'required',
            'fk_idSecctionApp'        => 'required',
        ], [
            'titleNotification.required' => 'Este campo es requerido',
            'fk_idSecctionApp.required'  => 'Este campo es requerido',
            '.required'                  => 'Este campo es requerido',
        ]);

        DB::beginTransaction();
        try {

            $notifications                          = new Notification();
            $notifications->titleNotification       = $request->titleNotification;
            $notifications->descriptionNotification = $request->descriptionNotification;
            $notifications->fk_idSecctionApp        = $request->fk_idSecctionApp;
            $notifications->fk_idUser               = Auth::user()->fk_idPerfil;
            $notifications->save();
            DB::commit();


            $response = [
                'msj' => 'Notificacion enviada',
            ];

            $data = [
                'descriptionNotification' => @$request->descriptionNotification,
                'idSecctionApp'           => $request->fk_idSecctionApp,
            ];

            $this->sendNotificationFb($notifications->titleNotification, $data);

            return response()->json($response, 201);

        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en NotificationController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }


    }

    // ENVIO DE NOTIFICACION FIRE BASE //
    public static function sendNotificationFb($title, $data, $tokenFB = null) {

        $notification = [
            'title'   => $title, // works fine here
            'body'    => $data['descriptionNotification'],
            'sound'   => 'default',
            'vibrate' => 'default',
        ];

        if ($tokenFB != null) {
            $param = [
                "to"           => $tokenFB,
                "notification" => $notification,
                "data"         => $data,
            ];
        } else {
            $param = [
                "to"           => "/topics/all",
                "notification" => $notification,
                "data"         => $data,
            ];
        }




        $headers = [
            'Authorization: key='.env('API_ACCESS_KEY', ''),
            'Content-Type: application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
        $result = curl_exec($ch);


        curl_close($ch);

    }
}
