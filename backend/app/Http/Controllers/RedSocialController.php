<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RedSocialController extends Controller
{
    public function store(Request $request){

      
        DB::beginTransaction();

        try {

            $usuario = new User($request->all());

            if (is_null($request->fotoPerfil)) {

            } else {

                /*para la foto*/
                $originalImage = $request->fotoPerfil;

                $thumbnailImage = Image::make($originalImage);
                $thumbnailImage->fit(2048, 2048, function($constraint) {
                    $constraint->aspectRatio();
                });
                $nombre_publico = $originalImage->getClientOriginalName();
                $extension      = $originalImage->getClientOriginalExtension();
                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
                Storage::disk('local')->put('/perfil/'.$nombre_interno, (string) $thumbnailImage->encode());
                /*para la foto*/

                $usuario->fotoPerfil = $nombre_interno;
            }

            if (is_null($request->password) == true) {
                $usuario->password = bcrypt($password_default);
                $usuario->generateToken();
            } else {
                $usuario->password = bcrypt($request->password);
            }

            $usuario->save();

            $response = [
                'msj'  => 'Usuario Creado',
                'user' => $usuario,
            ];
            DB::commit();

            /*enviando correo si la clave es por defecto*/

            if (is_null($request->password) == true) {

                Mail::to($usuario->email)->send(new Prueba($usuario, $password_default));
            }

            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en UserController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function updateRedesSociales(Request $request,$id_RedSocial){

    }
}
