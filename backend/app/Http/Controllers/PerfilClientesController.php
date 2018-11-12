<?php

namespace App\Http\Controllers;

use App\PerfilCliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PerfilClientesController extends Controller {

    public function store(Request $request) {

        $this->validate($request, [
            'nombreComercio'   => 'required',
            'nombre'           => 'required',
            'apellido'         => 'required',
            'documento'        => 'required',
            'correo'           => 'required',
            'telefono'         => 'required',
            'celular'          => 'required',
            'domicilioEntrega' => 'required',
            'facturacion'      => 'required',

        ], [
            'nombreComercio.required'   => 'El campo es requerido',
            'nombre.required'           => 'El campo es requerido',
            'apellido.required'         => 'El campo es requerido',
            'documento.required'        => 'El campo es requerido',
            'correo.required'           => 'El campo es requerido',
            'telefono.required'         => 'El campo es requerido',
            'celular.required'          => 'El campo es requerido',
            'domicilioEntrega.required' => 'El campo es requerido',
            'facturacion.required'      => 'El campo es requerido',
        ]);

        DB::beginTransaction();

        try {

            $perfilcliente = new PerfilCliente($request->all());

            $perfilcliente->save();

            $response = [
                'msj'  => 'Perfil creado exitosamente',
                'user' => $perfilcliente,
            ];
            DB::commit();

            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en PerfilClientesController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function update(Request $request, $idPerfilCliente) {


        DB::beginTransaction();

        try {
            $user = User::findOrFail($id);

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

                $user->fotoPerfil = $nombre_interno;
                /*para la foto*/
            }

            $pass_last = $user->password;
            $user->fill($request->all());

            if ($request->password != null && ! empty($request->password)) {
                $user->password = bcrypt($request->password);
            } else {
                $user->password = $pass_last;
            }

            $response = [
                'msj'  => 'Info del Usuario actulizada',
                'user' => $user,
            ];

            $user->save();
            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en UserController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }
}
