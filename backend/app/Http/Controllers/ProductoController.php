<?php

namespace App\Http\Controllers;

use App\Producto;
use function GuzzleHttp\Promise\promise_for;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductoController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function listar() {
        $productos = Producto::get();

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
