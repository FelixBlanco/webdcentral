<?php

namespace App\Http\Controllers;

use App\Producto;
use App\TagProduct;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function buscarGeneral($search = null)
    {

        if (! is_null($search)) {

            $busqueda = "%".$search."%";

            $mascotas = Producto::orWhere('rubro', 'like', $busqueda)
                ->orWhere('SubRubro1', 'like', $busqueda)
                ->orWhere('SubRubro2', 'like', $busqueda)
                ->where('fk_idSatate', '=', 1)
                ->get();

            $marcas = Producto::Where('marca', 'like', $busqueda)
                ->where('fk_idSatate', '=', 1)
                ->get();

            $nombre = Producto::Where('nombre', 'like', $busqueda)
                ->where('fk_idSatate', '=', 1)
                ->get();

            $response = [
                'msj'      => 'Productos',
                'mascotas' => $mascotas,
                'marcas'   => $marcas,
                'nombre'   => $nombre,
            ];

            return response()->json($response, 200);

        } else {

            $mascotas = Producto::where('fk_idSatate', '=', 1)
                ->get();

            $marcas = Producto::where('fk_idSatate', '=', 1)
                ->get();

            $nombre = Producto::where('fk_idSatate', '=', 1)
                ->get();

            $response = [
                'msj'      => 'Lista de producto',
                'mascotas' => $mascotas,
                'marcas'   => $marcas,
                'nombre'   => $nombre,
            ];

            return response()->json($response, 404);
        }
    }

    public function listarPorIsOutstanding()
    {
        $producto_activador = Producto::where('isOutstanding', 1)->get();
        $producto_desactivador = Producto::where('isOutstanding', 0)->get();

        $response = [
            'msj'          => 'Productos',
            'activados'    => $producto_activador,
            'desactivados' => $producto_desactivador,
        ];

        return response()->json($response, 200);
    }

    public function onIsOutstanding($idProducto)
    {
        DB::beginTransaction();

        try {
            $producto = Producto::findOrFail($idProducto);
            $producto->fill([
                'isOutstanding'      => 1,
                'fechaIsOutstanding' => Carbon::now()->toDateTimeString(),
            ]);

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

    public function offIsOutstanding($idProducto)
    {

        DB::beginTransaction();

        try {
            $producto = Producto::findOrFail($idProducto);
            $producto->fill([
                'isOutstanding'      => 0,
                'fechaIsOutstanding' => Carbon::now()->toDateTimeString(),
            ]);
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

            $productos = Producto::offset($request->offset)->limit($request->limit)->get();
        } else {
            if ($request->exists('search')) {

                $busqueda = "%".$request->search."%";

                $productos = Producto::where('nombre', 'like', $busqueda)->where('fk_idSatate', '=', 1)->orWhere('titulo', 'like', $busqueda)->orWhere('categoria', 'like', $busqueda)->get();
            } else {

                $productos = Producto::where('fk_idSatate', '=', 1)->get();
            }
        }

        $response = [
            'msj'      => 'Lista de productos',
            'producto' => $productos,
        ];

        return response()->json($response, 201);
    }

    public function listarPorNombre($nombre)
    {

        $busqueda = $nombre."%";

        $productos = Producto::where('nombre', 'like', $busqueda)->where('fk_idSatate', '=', 1)->get();

        $response = [
            'msj'       => 'Lista de productos',
            'productos' => $productos,
        ];

        return response()->json($response, 201);
    }

    public function index()
    {
        // todos los productos 
        return Producto::get();
    }

    public static function create($_product)
    {
        $rs = Producto::where("codeProdSys", "=", $_product['codeProdSys'])->first();

        if (! $rs) {

            $product = new Producto();
            $product->nombre = $_product['nombre'];
            $product->titulo = $_product['titulo'];
            $product->urlImage = $_product['urlImage'];
            $product->promocion = $_product['promocion'];
            $product->codeProdSys = $_product['codeProdSys'];
            $product->kiloProdcuto = $_product['kiloProdcuto'];
            $product->SubRubro1 = $_product['SubRubro1'];
            $product->SubRubro2 = $_product['SubRubro2'];
            $product->precioL1 = $_product['precioL1'];
            $product->precioL2 = $_product['precioL2'];
            $product->precioL3 = $_product['precioL3'];
            $product->precioL4 = $_product['precioL4'];
            $product->precioL5 = $_product['precioL5'];
            $product->precioL6 = $_product['precioL6'];
            $product->precioL7 = $_product['precioL7'];
            $product->precioL8 = $_product['precioL8'];
            $product->precioL9 = $_product['precioL9'];
            $product->rubro = $_product['rubro'];
            $product->marca = $_product['marca'];
            $product->fk_idSatate = 1;
            $product->destacado = 0;
            $product->isOutstanding = 0;

            $product->save();
        } else {
            $rs->nombre = $_product['nombre'];
            $rs->titulo = $_product['titulo'];
            $rs->urlImage = $_product['urlImage'];
            $rs->promocion = $_product['promocion'];
            $rs->codeProdSys = $_product['codeProdSys'];
            $rs->kiloProdcuto = $_product['kiloProdcuto'];
            $rs->SubRubro1 = $_product['SubRubro1'];
            $rs->SubRubro2 = $_product['SubRubro2'];
            $rs->precioL1 = $_product['precioL1'];
            $rs->precioL2 = $_product['precioL2'];
            $rs->precioL3 = $_product['precioL3'];
            $rs->precioL4 = $_product['precioL4'];
            $rs->precioL5 = $_product['precioL5'];
            $rs->precioL6 = $_product['precioL6'];
            $rs->precioL7 = $_product['precioL7'];
            $rs->precioL8 = $_product['precioL8'];
            $rs->precioL9 = $_product['precioL9'];
            $rs->rubro = $_product['rubro'];
            $rs->marca = $_product['marca'];
            $rs->fk_idSatate = 1;
            $rs->update();
        }
    }

    public static function createTag($_tag)
    {

        $rs = TagProduct::where("codeProdSys", "=", $_tag['codeProdSys'])->where("tag", "=", $_tag['tag'])->first();

        if (! is_null($_tag['tag']) && ! is_null($_tag['codeProdSys'])) {
            if (! $rs) {
                $tag = new TagProduct();
                $tag->tag = @$_tag['tag'];
                $tag->codeProdSys = @$_tag['codeProdSys'];
                $tag->fk_idSatate = 1;
                $tag->save();
            } else {
                $tag = new TagProduct();
                $tag->fk_idSatate = 1;
                $tag->update();
            }
        }
    }

    public static function getAllTags()
    {

        $response = TagProduct::select("tag")->distinct('tag')->orderBy("tag")->get();

        return response()->json($response, 202);
    }

    public static function getAllRubros()
    {

        $response = Producto::select("rubro")->distinct('rubro')->orderBy("rubro")->get();

        return response()->json($response, 202);
    }

    public static function getAllMarcas()
    {

        $response = Producto::select("marca")->distinct('marca')->orderBy("marca")->get();

        return response()->json($response, 202);
    }

    public static function searchMarca($search = null)
    {

        if (! is_null($search)) {
            $busqueda = $search."%";
            $response = Producto::select("marca")->where('marca', 'like', $busqueda)->distinct('marca')->orderBy("marca")->get();

            if (is_null($response)) {
                $response = [
                    'msj' => 'Producto no encontrado',
                ];

                return response()->json($response, 404);
            } else {
                return response()->json($response, 202);
            }
        } else {

            $response = [
                'msj' => 'Debe enviar el criterio de búsqueda',
            ];

            return response()->json($response, 404);
        }
    }
}
