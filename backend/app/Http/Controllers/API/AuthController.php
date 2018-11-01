<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use App\CouponsClient;
use Validator;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller {

    public function login(Request $request) {

        $request->validate([
            'email'       => 'required|string|email',
            'password'    => 'required|string',
            'remember_me' => 'boolean',
        ], [
            'email.required' => 'El email es requerido',
            'password.required' => 'El contraseña es requerida',
        ]);

        $credentials = request([ 'email', 'password' ]);

        if (! Auth::attempt($credentials))
            return response()->json([
                'msj' => 'No Autorizado',
            ], 401);

        $user = $request->user();


        $tokenResult = $user->createToken('Personal Access Token');
        $token       = $tokenResult->token;


        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);

        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type'   => 'Bearer',
            'expires_at'   => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request) {

        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Se ha desconectado correctamente',
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request) {

        $u = $request->user();

        $u->img_perfil = asset('storage/'.$request->user()->fotoPerfil); // Podemos solicitar la URL directamente aca
        
        // Buscamos el usuario de DEPOCITO si es chofer o cliente //
        if($u->fk_idPerfil == 3){// Chofer
            $userDc = $this->getUserDriverDC($u->email);
            if($userDc != ""){
                $u->auto = @$userDc->Modelo_Transporte." - ".@$userDc->Patente_Transporte;
                $u->totalImport = @$userDc->totalImport;
                $u->start =  "0.0";
            }
        }else if($u->fk_idPerfil == 2){// Cliente
            $userDc = $this->getUserClientDC($u->email);
            if($userDc != ""){
                $u->addres = @$userDc->Domicilio_Cliente;
                $u->totalOrder = @$userDc->totalImport;
                $u->totslCupons = CouponsClient::where("fk_idUser","=",$u->id)
                ->leftjoin("tb_coupons","tb_coupons.idCoupons","=","tb_coupons_client.fk_idCoupons")
                ->leftjoin("tb_productos","tb_productos.idProducto","=","tb_coupons.fk_idProducto")
                ->where("tb_coupons_client.fk_idSatate","=","1")
                ->get();
            }
        }

        try {
            return response()->json($u,201);
        } catch (\Exception $e) {
            Log::error('Ha ocurrido un error en AuthController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de obtener los datos.',
            ], 500);
        }
    }


    public function getUserDriverDC($email){
      
        try{
            $rs =   DB::connection('sqlsrv')->select(" SELECT *,
            (ISNULL((SELECT SUM(TotalCursoLegal)
            FROM VentasporComprobantes where EstadoPedido = 'Cerrado' 
            and Codigo_Transporte = Transportes.Codigo_Transporte),0))as totalImport
             FROM  Transportes where Email_Transporte = '".$email."' ")[0]; 
             
            if($rs){
                return $rs;
            }else{
                return null;
            }
        } catch (\Exception $e) {
            dd($e);

            return null;
        }
    }

    public function getUserClientDC($email){

        try{
            $rs =  DB::connection('sqlsrv')->select(" SELECT *,
            (ISNULL((SELECT SUM(TotalCursoLegal)
            FROM VentasporComprobantes where EstadoPedido = 'Cerrado' 
            and Codigo_Cliente = Clientes.Codigo_Cliente),0))as totalImport
             FROM  Clientes where Email_Cliente = '".$email."' ")[0]; 
            if($rs){
                return $rs;
            }else{
                return null;
            }
        } catch (\Exception $e) {
            return null;
        }

    }

}