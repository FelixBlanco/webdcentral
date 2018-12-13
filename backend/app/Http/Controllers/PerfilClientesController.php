<?php

namespace App\Http\Controllers;

use App\PerfilCliente;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PerfilClientesController extends Controller {
    public function store(Request $request) {

        $this->validate($request, [
            'nombreComercio'     => 'required',
            'nombre'             => 'required',
            'apellido'           => 'required',
            'documento_dni'      => 'required',
            'documento_otro'     => 'required',
            'correo'             => 'required',
            'telefono'           => 'required',
            'celular'            => 'required',
            'fk_idPerfilCliente' => 'required',

            'domicilio_entrega'   => 'required',
            'fk_idTipoFactura'    => 'required',
            'CUIT'                => 'required',
            'CUITrazonSocial'     => 'required',
            'CUITDomicilioFidcal' => 'required',
            'domicilio_1'         => 'required',


        ], [
            'nombreComercio.required'     => 'El campo es requerido',
            'nombre.required'             => 'El campo es requerido',
            'apellido.required'           => 'El campo es requerido',
            'documento_dni.required'      => 'El campo es requerido',
            'documento_otro.required'     => 'El campo es requerido',
            'correo.required'             => 'El campo es requerido',
            'telefono.required'           => 'El campo es requerido',
            'celular.required'            => 'El campo es requerido',
            'fk_idPerfilCliente.required' => 'El campo es requerido',

            'domicilio_entrega.required'   => 'El campo es requerido',
            'fk_idTipoFactura.required'    => 'El campo es requerido',
            'CUIT.required'                => 'El campo es requerido',
            'CUITrazonSocial.required'     => 'El campo es requerido',
            'CUITDomicilioFidcal.required' => 'El campo es requerido',
            'domicilio_1.required'         => 'Un campo domicilio es requerido',


        ]);

        DB::beginTransaction();
        $user = User::find($request->fk_idPerfilCliente);

        if (is_null($user)) {
            $response = [
                'msj' => 'El usuario (fk_idPerfilCliente) no existe',
            ];

            return response()->json($response, 404);
        }

        try {

            $perfilcliente = new PerfilCliente($request->all());

            $perfilcliente->save();
            $perfilcliente->user;

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

            $pefilCliente = PerfilCliente::find($idPerfilCliente);

            if (is_null($pefilCliente)) {
                $response = [
                    'msj' => 'El Perfil del cliente no existe (idPerfilCliente) no existe',
                ];

                return response()->json($response, 404);
            }

            $pefilCliente->update($request->all());

            $response = [
                'msj'    => 'Info del Perfil actulizada',
                'perfil' => $pefilCliente,
            ];

            //$pefilCliente->save();
            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en PerfilClientesController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function destroy($idPerfilCliente) {

        DB::beginTransaction();

        $pefilCliente = PerfilCliente::find($idPerfilCliente);

        if (is_null($pefilCliente)) {
            $response = [
                'msj' => 'El Perfil del cliente no existe (idPerfilCliente) no existe',
            ];

            return response()->json($response, 404);
        }
        try {
            $pefilCliente = PerfilCliente::findOrFail($idPerfilCliente);
            $pefilCliente->delete();

            $response = [
                'msj' => 'Perfil eliminado Correctamente',
            ];

            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en PerfilClientesController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }

    public function listar() {
        $perfil_cliente = PerfilCliente::with('user')->get();

        $response = [
            'msj'      => 'Lista de perfiles',
            'perfiles' => $perfil_cliente,
        ];

        return response()->json($response, 201);
    }

    public function getPerfil($id) {
        $perfil_cliente = PerfilCliente::where('fk_idPerfilCliente', $id)->first();

        if (is_null($perfil_cliente)) {
            return null;
        } else {
            $response = [
                'msj'    => 'Perfiles',
                'perfil' => $perfil_cliente,
            ];

            return response()->json($response, 201);
        }

    }
}
