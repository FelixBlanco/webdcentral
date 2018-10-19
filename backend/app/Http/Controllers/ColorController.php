<?php

namespace App\Http\Controllers;

use App\Color;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ColorController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

        $this->validate($request, [
            'colorOscuro' => 'required|unique:tb_colores,colorOscuro,'.$request->idColor.',idColor',
            'colorMedio'  => 'required|unique:tb_colores,colorMedio,'.$request->idColor.',idColor',
            'colorClaro'  => 'required|unique:tb_colores,colorClaro,'.$request->idColor.',idColor',

        ], [
            'colorOscuro.required' => 'El color Oscuro es requerido',
            'colorOscuro.unique'   => 'Este color ya se encuentra en uso',

            'colorMedio.required' => 'El color Medio es requerido',
            'colorMedio.unique'   => 'Este color ya se encuentra en uso',

            'colorClaro.required' => 'El color Claro es requerido',
            'colorClaro.unique'   => 'Este color ya se encuentra en uso',


        ]);

        DB::beginTransaction();

        try {

            $color = new Color($request->all());

            $color->save();

            $response = [
                'msj'  => 'Colores Creados',
                'colores' => $color,
            ];
            DB::commit();


            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en ColorController: '.$e->getMessage().', Linea: '.$e->getLine());

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

        DB::beginTransaction();

        try {
            $color = Color::findOrFail($id);
            $color->delete();

            $response = [
                'msj'  => 'Paleta de colores eliminada Correctamente',
            ];

            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en ColorController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }
}
