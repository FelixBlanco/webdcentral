<?php

namespace App\Http\Controllers;

use App\Producto;
use Carbon\Carbon;
use function GuzzleHttp\Promise\promise_for;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductoController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listarPorIsOutstanding() {
        $producto_activador    = Producto::where('isOutstanding', 1)->get();
        $producto_desactivador = Producto::where('isOutstanding', 0)->get();

        $response = [
            'msj'          => 'Productos',
            'activados'    => $producto_activador,
            'desactivados' => $producto_desactivador,
        ];

        return response()->json($response, 200);
    }

    public function onIsOutstanding($idProducto) {
        DB::beginTransaction();

        try {
            $producto = Producto::findOrFail($idProducto);
            $producto->fill([ 'isOutstanding' => 1, 'fechaIsOutstanding' => Carbon::now()->toDateTimeString() ]);

            $producto->save();

            DB::commit();


            $response = [
                'msj'  => 'Producto activado',
                'user' => $producto,
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en ProductoController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }


    }

    public function offIsOutstanding($idProducto) {

        DB::beginTransaction();

        try {
            $producto = Producto::findOrFail($idProducto);
            $producto->fill([ 'isOutstanding' => 0, 'fechaIsOutstanding' => Carbon::now()->toDateTimeString() ]);
            $producto->save();

            DB::commit();

            $response = [
                'msj'  => 'Producto desactivado',
                'user' => $producto,
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en ProductoController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }


    }

    public function listar(Request $request) {

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

            $productos = Producto::offset($request->offset)
                ->limit($request->limit)
                ->get();

        } else {
            if ($request->exists('search')) {

                $busqueda = "%".$request->search."%";

                $productos = Producto::where('nombre', 'like', $busqueda)
                    ->orWhere('titulo', 'like', $busqueda)
                    ->orWhere('categoria', 'like', $busqueda)
                    ->get();

            } else {

                $productos = Producto::get();
            }
        }

        $response = [
            'msj'      => 'Lista de productos',
            'producto' => $productos,
        ];

        return response()->json($response, 201);
    }

    public function listarPorNombre($nombre) {

        $busqueda = $nombre."%";

        $productos = Producto::where('nombre', 'like', $busqueda)->get();

        $response = [
            'msj'       => 'Lista de productos',
            'productos' => $productos,
        ];

        return response()->json($response, 201);
    }


    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public static function create($request) {
        //
        $product                    = new Producto;
        $product->nombre            = $request->nombre;
        $product->titulo            = $request->titulo;
        $product->urlImage          = $request->urlImage;
        $product->promocion         = $request->promocion;
        $product->categoria         = $request->categoria;
        $product->fk_idPesoProducto = $request->fk_idPesoProducto;
        $product->save();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        //
    }
}
