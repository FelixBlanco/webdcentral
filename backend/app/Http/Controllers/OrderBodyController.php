<?php

namespace App\Http\Controllers;

use App\orderBody;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderBodyController extends Controller {
    public function añadir(Request $request, $fk_idOrderHeader) {

        DB::beginTransaction();

        foreach ($request->items as $item) {
            try {
                $OH                   = new orderBody($item);
                $OH->fk_idOrderHeader = $fk_idOrderHeader;
                $OH->save();
                $OH->orderHeader;
                $respo[] = $OH;

            } catch (\Exception $e) {

                Log::error('Ha ocurrido un error en OrderBodyController: '.$e->getMessage().', Linea: '.$e->getLine());

                return response()->json([
                    'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
                ], 500);
            }
        }

        $response = [
            'msj'         => 'OrderBody Creada exitosamente',
            'orderHeader' => $OH,
        ];
        DB::commit();

        return response()->json($response, 201);
    }
}
