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
            // 'nombre'           => 'required',
            // 'apellido'         => 'required',
            'documento'        => 'required',
            'correo'           => 'required',
            'telefono'         => 'required',
            'celular'          => 'required',
            'domicilioEntrega' => 'required',
            'facturacion'      => 'required',

        ], [
            'nombreComercio.required'   => 'El campo es requerido',
            // 'nombre.required'           => 'El campo es requerido',
            // 'apellido.required'         => 'El campo es requerido',
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
            $pefilCliente = PerfilCliente::findOrFail($idPerfilCliente);

            $pefilCliente->update($request->all());

            $response = [
                'msj'  => 'Info del Perfil actulizada',
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

        try {
            $pefilCliente = PerfilCliente::findOrFail($idPerfilCliente);
            $pefilCliente->delete();

            $response = [
                'msj'  => 'Perfil eliminado Correctamente',
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
}
