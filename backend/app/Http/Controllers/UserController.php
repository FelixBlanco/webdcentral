<?php

namespace App\Http\Controllers;

use App\Mail\Prueba;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Image;

class UserController extends Controller
{
    public function listar(Request $request)
    {

        if ($request->exists('offset') && $request->exists('limit')) {

            $this->validate($request, [
                'offset' => 'integer|min:1',
                'limit'  => 'integer|min:1',
            ], [
                'offset.integer' => 'Debe ser numérico',
                'limit.integer'  => 'Debe ser numérico',

                'offset.min' => 'Debe tener al menos un número',
                'limit.min'  => 'Debe tener al menos un número',
            ]);

            $users = User::offset($request->offset)->limit($request->limit)->get();
        } else {
            if ($request->exists('search')) {

                $busqueda = "%".$request->search."%";

                $users = User::where('name', 'like', $busqueda)->orWhere('userName', 'like', $busqueda)->orWhere('email', 'like', $busqueda)->get();
            } else {

                $users = User::all();
            }
        }

        $users->each(function ($users) {
            $users->perfil;
            if (! is_null($users->fotoPerfil)) {
                $users->ruta_imagen = asset('storage\\perfil\\'.$users->fotoPerfil);
            }

            return $users;
        });

        $response = [
            'msj'   => 'Lista de usuarios',
            'users' => $users,
        ];

        return response()->json($response, 202);
    }

    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {

        $password_default = 123456;

        $this->validate($request, [
            'name'                  => 'required|max:30|min:2',
            'email'                 => 'required|unique:tb_users,email,'.$request->id.',id',
            'password'              => 'min:8|confirmed', /*ya no sera requerida, debido a que puede ser null*/
            'password_confirmation' => 'required|min:8',
            //'userName'    => 'required|unique:tb_users,userName,'.$request->id.',id',
            //'fk_idPerfil' => 'required',
            //'fotoPerfil'  => 'image|required|mimes:jpeg,png,jpg,gif,svg',
        ], [
            'name.required'                  => 'El Nombre es requerido',
            'name.max'                       => 'El Nombre no puede tener mas de 20 caracteres',
            'name.min'                       => 'El Nombre no puede tener menos de 2 caracteres',
            'email.unique'                   => 'Este Email ya se encuentra en uso',
            'email.email'                    => 'El Email debe de tener un formato ejemplo@ejemplo.com',
            'email.required'                 => 'El Email es requerido',
            'password.min'                   => 'La contraseña debe de tener minimo 8 caracteres',
            'password_confirmation.required' => 'Este campo es requerido',
            'password.confirmed'             => 'Las contraseña no coinciden vuelva a intentar',
            //'userName'             => 'El User Name es requerido',
            //'userName.unique'      => 'El User Name ya esta en uso',
            //'fk_idPerfil.required' => 'Este campo es requerido',
            //'fotoPerfil.reqired'   => 'La foto de perfil es requerida',

        ]);

        DB::beginTransaction();

        try {

            $usuario = new User($request->all());

            if (is_null($request->fotoPerfil)) {
            } else {

                /*para la foto*/
                $originalImage = $request->fotoPerfil;

                $thumbnailImage = Image::make($originalImage);
                $thumbnailImage->fit(2048, 2048, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $nombre_publico = $originalImage->getClientOriginalName();
                $extension='png';
                //$extension = $originalImage->getClientOriginalExtension();
                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
                Storage::disk('local')->put('\\perfil\\'.$nombre_interno, (string) $thumbnailImage->encode());
                /*para la foto*/

                $usuario->fotoPerfil = $nombre_interno;
            }

            if (is_null($request->password) == true) {
                $usuario->password = bcrypt($password_default);
                $usuario->generateToken();
            } else {
                $usuario->password = bcrypt($request->password);
            }

            $usuario->fk_idPerfil = 2;
            $usuario->userName = $request->email;

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

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

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
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        /*$this->validate($request, [
            'name'  => 'required|max:30|min:2',
            'email' => 'required|unique:tb_users,email,'.$request->id,

            'userName'    => 'required|unique:tb_users,userName,'.$request->id,
            'fk_idPerfil' => 'required',

        ], [
            'name.required' => 'El Nombre es requerido',
            'name.max'      => 'El Nombre no puede tener mas de 20 caracteres',
            'name.min'      => 'El Nombre no puede tener menos de 2 caracteres',

            'email.unique'   => 'Este Email ya se encuentra en uso',
            'email.email'    => 'El Email debe de tener un formato ejemplo@ejemplo.com',
            'email.required' => 'El Email es requerido',

            'userName' => 'El User Name es requerido',

            'userName.unique'      => 'El User Name ya esta en uso',
            'fk_idPerfil.required' => 'Este campo es requerido',
        ]);*/

        DB::beginTransaction();

        try {
            $user = User::findOrFail($id);

            $pass_last = $user->password;
            $user->fill($request->all());

            if (is_null($request->fotoPerfil)) {
            } else {

                /*para la foto*/
                $originalImage = $request->fotoPerfil;

                $thumbnailImage = Image::make($originalImage);
                $thumbnailImage->fit(2048, 2048, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $nombre_publico = $originalImage->getClientOriginalName();
                $extension='png';
                //$extension = $originalImage->getClientOriginalExtension();
                $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
                $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
                Storage::disk('local')->put('\\perfil\\'.$nombre_interno, (string) $thumbnailImage->encode());

                $user->fotoPerfil = $nombre_interno;
                /*para la foto*/
            }

            if ($request->password != null && ! empty($request->password)) {
                $user->password = bcrypt($request->password);
            } else {
                $user->password = $pass_last;
            }

            $response = [
                'msj'         => 'Info del Usuario actulizada',
                'user'        => $user,
                'ruta_imagen' => asset('storage\\perfil\\'.$user->fotoPerfil),
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

    public function destroy($id)
    {

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

    public function getFotoPerfil($archivo)
    {

        if (Storage::exists('\\perfil\\'.$archivo)) {

            /* -habilitar si quieres recibir la imagen en streaming  */
            return Storage::response("perfil\\".$archivo);
            //-return response()->json(Storage::url('galeri/'.$archivo), 201);
        } else {
            return response()->json('Archivo no encontrado', 404);
        }
    }

    public function setClave(Request $request, $api_token)
    {

        $this->validate($request, [
            'password' => 'required|min:8',
        ], [
            'password.required' => 'Este campo es requerido',
            'password.min'      => 'La contraseña debe de tener minimo 8 caracteres',
        ]);

        DB::beginTransaction();

        try {

            $user = User::where('api_token', $api_token)->first();

            $user = User::findOrFail($user->id);

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

    // Actualizamos o agragamos la img de perfil

    public function upgradeFotoPerfil(Request $request)
    {

        $this->validate($request, [
            'id_user'    => 'required',
            'fotoPerfil' => 'required',
        ], [
            'id_user.required'    => 'Este campo es requerido',
            'fotoPerfil.required' => 'Este campo es requerido',
        ]);
        $usuario = User::find($request->id_user);

        if ($usuario) {

            /*para la foto*/
            $originalImage = $request->fotoPerfil;

            $thumbnailImage = Image::make($originalImage);
            $thumbnailImage->fit(2048, 2048, function ($constraint) {
                $constraint->aspectRatio();
            });
            $nombre_publico = $originalImage->getClientOriginalName();
            $extension='png';
            //$extension = $originalImage->getClientOriginalExtension();
            $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
            $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
            Storage::disk('local')->put('\\perfil\\'.$nombre_interno, (string) $thumbnailImage->encode());
            /*para la foto*/

            $usuario->fotoPerfil = $nombre_interno;
            $usuario->save();

            $response = [
                'msj'         => 'Imagen de perfil creada exitosamente',
                'user'        => $usuario,
                'ruta_imagen' => asset('storage\\perfil\\'),
            ];

            return response()->json($response, 201);
        } else {
            $response = [
                'msj' => 'El usuario no existe',
            ];

            return response()->json($response, 404);
        }
    }

    public function reestablecerClave(Request $request)
    {

        $this->validate($request, [
            'email' => 'required',
        ], [
            'email.required' => 'El Email es requerido',
        ]);

        $user = User::where('email', $request->email)->first();

        if (is_null($user)) {

            $response = [
                'msj' => 'Si eres usuario nuetro, te enviamos un Mail, revise su correo para proceder al inicio de sesión',
            ];

            return response()->json($response, 200);
        } else {
            $clave_nueva = str_random(6);
            $user->password = bcrypt($clave_nueva);
            $user->save();

            Mail::to($user->email)->send(new Prueba($user, $clave_nueva));
            $response = [
                'msj'       => 'Si eres usuario nuetro, te enviamos un Mail, revise su correo para proceder al inicio de sesión',
                'user'      => $user,
                'clave_new' => $clave_nueva,
            ];

            return response()->json($response, 200);
        }
    }

    public function updateTokenFirebase(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->tokenFirebase = $request->tokenFirebase;
        $user->save();
    }

    public function addFotoPerfil(Request $request)
    {

        $this->validate($request, [
            'id_user'    => 'required',
            'fotoPerfil' => 'image|required|mimes:jpeg,png,jpg,gif,svg',
        ], [
            'fotoPerfil.reqired' => 'La foto de perfil es requerida',
            'id_user.required'   => 'Este campo es requerido',
        ]);
        $usuario = User::find($request->id_user);

        if ($usuario) {

            /*para la foto*/
            $originalImage = $request->fotoPerfil;

            $thumbnailImage = Image::make($originalImage);
            $thumbnailImage->fit(2048, 2048, function ($constraint) {
                $constraint->aspectRatio();
            });
            $nombre_publico = $originalImage->getClientOriginalName();
            $extension='png';
           // $extension = $originalImage->getClientOriginalExtension();
            $nombre_interno = str_replace('.'.$extension, '', $nombre_publico);
            $nombre_interno = str_slug($nombre_interno, '-').'-'.time().'-'.strval(rand(100, 999)).'.'.$extension;
            Storage::disk('local')->put('\\perfil\\'.$nombre_interno, (string) $thumbnailImage->encode());
            /*para la foto*/

            $usuario->fotoPerfil = $nombre_interno;
            $usuario->save();

            $response = [
                'msj'         => 'Imagen de perfil creada exitosamente',
                'user'        => $usuario,
                'ruta_imagen' => asset('storage\\perfil\\'),
            ];

            return response()->json($response, 201);
        } else {
            $response = [
                'msj' => 'El usuario no existe',
            ];

            return response()->json($response, 404);
        }
    }
}
