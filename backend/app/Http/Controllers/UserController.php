<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

use Image;

class UserController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {

        $users    = User::all();
        $users->each(function ($users) {
            $users->perfil;
            return $users;
        });

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

        $password_default = 123456;



        $this->validate($request, [
            'name'          => 'required|max:30|min:2',
            'email'         => 'required|unique:tb_users,email,'.$request->id.',id',
            'password'      => 'min:8', /*ya no sera requerida, debido a que puede ser null*/
            'userName'      => 'required|unique:tb_users,userName,'.$request->id.',id',
            'fk_idPerfil' => 'required',
            'fotoPerfil'    => 'image|required|mimes:jpeg,png,jpg,gif,svg',
        ], [
            'name.required'          => 'El Nombre es requerido',
            'name.max'               => 'El Nombre no puede tener mas de 20 caracteres',
            'name.min'               => 'El Nombre no puede tener menos de 2 caracteres',
            'email.unique'           => 'Este Email ya se encuentra en uso',
            'email.email'            => 'El Email debe de tener un formato ejemplo@ejemplo.com',
            'email.required'         => 'El Email es requerido',
            'password.min'           => 'La contraseña debe de tener minimo 8 caracteres',
            'userName'               => 'El User Name es requerido',
            'userName.unique'        => 'El User Name ya esta en uso',
            'fk_tipoPerfil.required' => 'Este campo es requerido',
            'fotoPerfil.reqired'     => 'La foto de perfil es requerida',

        ]);

        DB::beginTransaction();

        try {
            $usuario = new User($request->all());



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
            'name'     => 'required|max:30|min:2',
            'email'    => 'required|unique:tb_users,email,'.$request->id,
            'password' => 'required|min:8',
            'userName' => 'required|unique:tb_users,userName,'.$request->id,

        ], [
            'name.required' => 'El Nombre es requerido',
            'name.max'      => 'El Nombre no puede tener mas de 20 caracteres',
            'name.min'      => 'El Nombre no puede tener menos de 2 caracteres',

            'email.unique'   => 'Este Email ya se encuentra en uso',
            'email.email'    => 'El Email debe de tener un formato ejemplo@ejemplo.com',
            'email.required' => 'El Email es requerido',

            'password.required' => 'Este campo es requerido',
            'password.min'      => 'La contraseña debe de tener minimo 8 caracteres',
            'userName'          => 'El User Name es requerido',

            'userName.unique' => 'El User Name ya esta en uso',
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

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en UserController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }


    public function getFotoPerfil($archivo) {

        if (Storage::exists('/perfil/'.$archivo)) {

            /* habilitar si quieres recibir la imagen en streaming  */
            return Storage::response("perfil/".$archivo);

            //return response()->json(Storage::url('galeri/'.$archivo), 201);
        } else {
            return response()->json('Archivo no encontrado', 404);
        }
    }
}
