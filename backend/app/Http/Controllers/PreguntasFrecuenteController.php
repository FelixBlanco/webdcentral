<?php

namespace App\Http\Controllers;

use App\PreguntasFrecuente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PreguntasFrecuenteController extends Controller
{

    public function crearPreguntaYRespuesta(Request $request)
    {
        $this->validate($request, [
            'pregunta'  => 'required',
            'respuesta' => 'required',
        ], [
            'pregunta.required'  => 'La Pregunta es requerida',
            'respuesta.required' => 'La Respuesta es requerida',
        ]);

        DB::beginTransaction();

        try {

            $PFrec = new PreguntasFrecuente($request->all());

            $PFrec->fk_idUser = Auth::user()->id;
            $PFrec->user;
            $PFrec->save();

            $response = [
                'msj'                => 'Pregunta y respuesta creada Correctamente',
                'preguntaYRespuesta' => $PFrec,
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
                'msj'                  => 'Info',
                'pregunta_y_respuesta' => $PFrec,
            ];

            return response()->json($response, 201);
        }
    }

    public function editarPreguntaORespuesta(Request $request, $idPreguntaFrecuente) {

        $this->validate($request, [
            'pregunta'  => 'required',
            'respuesta' => 'required',
        ], [
            'pregunta.required'  => 'La Pregunta es requerida',
            'respuesta.required' => 'La Respuesta es requerida',
        ]);

        DB::beginTransaction();

        try {
            $PFrec = PreguntasFrecuente::findOrFail($idPreguntaFrecuente);

            $PFrec->fill($request->all());

            $response = [
                'msj'                  => 'Info actulizada',
                'pregunta_y_respuesta' => $PFrec,
            ];

            $PFrec->save();
            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en PreguntaFrecuenteController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
            ], 500);
        }
    }

    public function borrarPreguntaORespuesta($idPreguntaFrecuente) {

        DB::beginTransaction();

        try {
            $PFrec = PreguntasFrecuente::findOrFail($idPreguntaFrecuente);
            $PFrec->delete();

            $response = [
                'msj'                  => 'pregunta y respuesta eliminada Correctamente',
                'pregunta_y_respuesta' => $PFrec,
            ];

            DB::commit();

            return response()->json($response, 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Ha ocurrido un error en PreguntaFrecuenteController: '.$e->getMessage().', Linea: '.$e->getLine());

            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
            ], 500);
        }
    }

    public function listar(Request $request){

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

            $PFrec = PreguntasFrecuente::offset($request->offset)
                ->limit($request->limit)
                ->get();

        } else {
            if ($request->exists('search')) {

                $busqueda = "%".$request->search."%";

                $PFrec = PreguntasFrecuente::where('pregunta', 'like', $busqueda)
                    ->orWhere('respuesta', 'like', $busqueda)
                    ->get();

            } else {

                $PFrec = PreguntasFrecuente::all();
            }
        }

        $PFrec->each(function($PFrec) {
            $PFrec->user;

            return $PFrec;
        });

        $response = [
            'msj'   => 'Lista de Preguntas y respuestas',
            'PFrec' => $PFrec,
        ];

        return response()->json($response, 202);

    }
}
