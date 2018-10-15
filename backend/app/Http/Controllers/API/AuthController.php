<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Validator;

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
            'message' => 'Successfully logged out',
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request) {

        $u = $request->user();
        $u->img_perfil = asset('storage/'.$request->user()->foto_perfil); // Podemos solicitar la URL directamente aca

        try {
            return response()->json($u,201);
        } catch (\Exception $e) {
            Log::error('Ha ocurrido un error en AuthController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de obtener los datos.',
            ], 500);
        }
    }

}