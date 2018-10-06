<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {

        $users    = User::all();
        $response = [
            'msj'   => 'Lista de usuarios',
            'users' => $users,
        ];

        return response()->json($response, 202);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

        $this->validate($request, [
            'name'                  => 'required|max:30|min:2',
            'email'                 => 'required|unique:tb_users,email,'.$request->id.',id',
            'password'              => 'required|min:8|confirmed',
            'userName'              => 'required|unique:tb_users,userName,'.$request->id.',id',
            'password_confirmation' => 'required|min:8',
        ], [
            'name.required'                  => 'El Nombre es requerido',
            'name.max'                       => 'El Nombre no puede tener mas de 20 caracteres',
            'name.min'                       => 'El Nombre no puede tener menos de 2 caracteres',
            'email.unique'                   => 'Este Email ya se encuentra en uso',
            'email.email'                    => 'El Email debe de tener un formato ejemplo@ejemplo.com',
            'email.required'                 => 'El Email es requerido',
            'password_confirmation.required' => 'Este campo es requerido',
            'password.required'              => 'Este campo es requerido',
            'password.confirmed'             => 'Las contraseña no coinciden vuelva a intentar',
            'password.min'                   => 'La contraseña debe de tener minimo 8 caracteres',
            'userName'                       => 'El User Name es requerido',
            'userName.unique'                => 'El User Name ya esta en uso',
            'password_confirmation'          => 'La contraseña es requerida',

        ]);

        DB::beginTransaction();

        try {
            $usuario           = new User($request->all());
            $usuario->password = bcrypt($request->password);
            $usuario->save();

            $response = [
                'msj'  => 'Usuario Creado',
                'user' => $usuario,
            ];
            DB::commit();

            return response()->json($response, 201);

        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en UserController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {

        try {

            $user = User::findOrFail($id);

            $response = [
                'msj'  => 'Info del Usuario',
                'user' => $user,
            ];

            return response()->json($response, 200);

        } catch (\Exception $e) {
            Log::error('Ha ocurrido un error en UserController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de obtener los datos.',
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {

        $this->validate($request, [
            'name'                  => 'required|max:30|min:2',
            'email'                 => 'required|unique:tb_users,email,'.$request->id,
            'password'              => 'required|min:8|confirmed',
            'userName'              => 'required|unique:tb_users,userName,'.$request->id,
            'password_confirmation' => 'required|min:8',
        ], [
            'name.required'                  => 'El Nombre es requerido',
            'name.max'                       => 'El Nombre no puede tener mas de 20 caracteres',
            'name.min'                       => 'El Nombre no puede tener menos de 2 caracteres',
            'email.unique'                   => 'Este Email ya se encuentra en uso',
            'email.email'                    => 'El Email debe de tener un formato ejemplo@ejemplo.com',
            'email.required'                 => 'El Email es requerido',
            'password_confirmation.required' => 'Este campo es requerido',
            'password.required'              => 'Este campo es requerido',
            'password.confirmed'             => 'Las contraseña no coinciden vuelva a intentar',
            'password.min'                   => 'La contraseña debe de tener minimo 8 caracteres',
            'userName'                       => 'El User Name es requerido',
            'userName.unique'                => 'El User Name ya esta en uso',
            'password_confirmation'          => 'La contraseña es requerida',

        ]);

        DB::beginTransaction();

        try {
            $user = User::findOrFail($id);

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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {

        DB::beginTransaction();

        try {
            $user = User::findOrFail($id);
            $user->delete();

            $response = [
                'msj'  => 'Usuario eliminado Correctamente',
                'user' => $user,
            ];

            DB::commit();
            return response()->json($response,200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en UserController: ' . $e->getMessage() . ', Linea: ' . $e->getLine());
            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }
}
