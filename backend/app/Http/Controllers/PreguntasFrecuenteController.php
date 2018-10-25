<?php

namespace App\Http\Controllers;

use App\PreguntasFrecuente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PreguntasFrecuenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function crearPregunta(Request $request)
    {

        $this->validate($request, [
            'pregunta' => 'required',
        ], [
            'pregunta.required' => 'La Pregunta es requerida',
        ]);

        DB::beginTransaction();

        try {

            $PFrec = new PreguntasFrecuente($request->all());

            $PFrec->fk_idUser = Auth::user()->id;
            $PFrec->user;
            $PFrec->save();

            $response = [
                'msj'      => 'Pregunta creada Correctamente',
                'pregunta' => $PFrec,
            ];
            DB::commit();

            return response()->json($response, 201);
        } catch (\Exception $e) {

            DB::rollback();
            Log::error('Ha ocurrido un error en PreguntaFrecuenteController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function respoderPregunta(Request $request, $idPreguntaFrecuente)
    {

        $this->validate($request, [
            'respuesta' => 'required',
        ], [
            'respuesta.required' => 'La Respuesta es requerida',
        ]);

        if ($idPreguntaFrecuente == null) {
            $response = [
                'msj' => 'Falta el id del la respuesta',
            ];

            return response()->json($response, 201);
        } else {

            DB::beginTransaction();

            try {

                $PFrec = PreguntasFrecuente::findOrFail($idPreguntaFrecuente);
                $PFrec->fill(['respuesta' => $request->respuesta]);

                $PFrec->save();

                $PFrec->user;

                $response = [
                    'msj'      => 'Respuesta guardada Correctamente',
                    'pregunta' => $PFrec,
                ];

                DB::commit();

                return response()->json($response, 201);
            } catch (\Exception $e) {

                DB::rollback();
                Log::error('Ha ocurrido un error en PreguntaFrecuenteController: '.$e->getMessage().', Linea: '.$e->getLine());

                return response()->json([
                    'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
                ], 500);
            }
        }
    }

    public function verPreguntaORespuesta($idPreguntaFrecuente)
    {

        $PFrec = PreguntasFrecuente::findOrFail($idPreguntaFrecuente);

        if (is_null($PFrec)) {

            $response = [
                'msj' => 'La Pregunta o respuesta no existe',
            ];

            return response()->json($response, 404);
        } else {

            $response = [
                'msj'      => 'Info',
                'pregunta y respuesta' => $PFrec,
            ];

            return response()->json($response, 201);
        }
    }

    public function index()
    {
        //
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
