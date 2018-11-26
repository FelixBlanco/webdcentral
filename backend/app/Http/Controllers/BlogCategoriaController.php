<?php

namespace App\Http\Controllers;

use App\BlogCategoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BlogCategoriaController extends Controller {

    public function add(Request $request) {

        $this->validate($request, [
            'titulo' => 'required',
        ], [
            'titulo.required' => 'El título es requerido',
        ]);

        DB::beginTransaction();

        try {

            $CategoriaBlog = new BlogCategoria($request->all());

            $CategoriaBlog->save();

            $response = [
                'msj'       => 'Categoria de blog Creado',
                'categoria' => $CategoriaBlog,
            ];
            DB::commit();

            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en BlogCategoriaController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function edit(Request $request, $idBlogCategoria) {

        if ($request->all() == []) {
            $response = [
                'msj' => 'debe enviar algún parametro para actualizar',
            ];

            return response()->json($response, 404);
        }

        DB::beginTransaction();

        try {
            $CatBlog = BlogCategoria::find($idBlogCategoria);

            if (! is_null($CatBlog)) {
                $CatBlog->fill($request->all());

                $response = [
                    'msj'       => 'Información actulizada',
                    'categoria' => $CatBlog,
                ];

                $CatBlog->save();
                DB::commit();

                return response()->json($response, 200);
            } else {
                $response = [
                    'msj'       => 'La Categoria no existe',
                ];

                return response()->json($response, 404);
            }


        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en BlogCategoriaController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function borrar($idBlogCategoria) {
        DB::beginTransaction();

        try {
            $CatBlog = BlogCategoria::findOrFail($idBlogCategoria);
            $CatBlog->delete();

            $response = [
                'msj' => 'Categoria eliminada Correctamente',
            ];

            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en BlogCategoriaController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }

    public function listar() {
        $CatBlog  = BlogCategoria::get();
        $response = [
            'msj' => 'Lista de Categorias',
            'cat' => $CatBlog,
        ];

        return response()->json($response, 200);
    }

    public function buscarIdBlogCategoria($idBlogCategoria) {

        $CatBlog = BlogCategoria::find($idBlogCategoria);
        if (! is_null($CatBlog)) {

            $response = [
                'msj' => 'Lista de Categorias',
                'cat' => $CatBlog,
            ];

            return response()->json($response, 200);
        } else {
            $response = [
                'msj' => 'La Categoria no existe',
            ];

            return response()->json($response, 404);
        }
    }
}
