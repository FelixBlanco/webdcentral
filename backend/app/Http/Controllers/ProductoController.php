<?php

namespace App\Http\Controllers;

use App\Producto;
use App\TagProduct;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductoController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function buscarGeneral($search = null) {

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

    public function offIsOutstanding($idProducto) {

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

    public function listarPorNombre($nombre) {

        $busqueda = $nombre."%";

        $productos = Producto::where('nombre', 'like', $busqueda)->where('fk_idSatate', '=', 1)->get();

        $response = [
            'msj'       => 'Lista de productos',
            'productos' => $productos,
        ];

        return response()->json($response, 201);
    }

    public function index() {
        // todos los productos 
        return Producto::get();
    }

    public static function create($_product) {
        $rs = Producto::where("codeProdSys", "=", $_product['codeProdSys'])->first();

        if (! $rs) {

            $product                = new Producto();
            $product->nombre        = $_product['nombre'];
            $product->titulo        = $_product['titulo'];
            $product->urlImage      = $_product['urlImage'];
            $product->promocion     = $_product['promocion'];
            $product->codeProdSys   = $_product['codeProdSys'];
            $product->kiloProdcuto  = $_product['kiloProdcuto'];
            $product->SubRubro1     = $_product['SubRubro1'];
            $product->SubRubro2     = $_product['SubRubro2'];
            $product->precioL1      = $_product['precioL1'];
            $product->precioL2      = $_product['precioL2'];
            $product->precioL3      = $_product['precioL3'];
            $product->precioL4      = $_product['precioL4'];
            $product->precioL5      = $_product['precioL5'];
            $product->precioL6      = $_product['precioL6'];
            $product->precioL7      = $_product['precioL7'];
            $product->precioL8      = $_product['precioL8'];
            $product->precioL9      = $_product['precioL9'];
            $product->rubro         = $_product['rubro'];
            $product->marca         = $_product['marca'];
            $product->fk_idSatate   = 1;
            $product->destacado     = 0;
            $product->isOutstanding = 0;

            $product->save();
        } else {
            $rs->nombre       = $_product['nombre'];
            $rs->titulo       = $_product['titulo'];
            $rs->urlImage     = $_product['urlImage'];
            $rs->promocion    = $_product['promocion'];
            $rs->codeProdSys  = $_product['codeProdSys'];
            $rs->kiloProdcuto = $_product['kiloProdcuto'];
            $rs->SubRubro1    = $_product['SubRubro1'];
            $rs->SubRubro2    = $_product['SubRubro2'];
            $rs->precioL1     = $_product['precioL1'];
            $rs->precioL2     = $_product['precioL2'];
            $rs->precioL3     = $_product['precioL3'];
            $rs->precioL4     = $_product['precioL4'];
            $rs->precioL5     = $_product['precioL5'];
            $rs->precioL6     = $_product['precioL6'];
            $rs->precioL7     = $_product['precioL7'];
            $rs->precioL8     = $_product['precioL8'];
            $rs->precioL9     = $_product['precioL9'];
            $rs->rubro        = $_product['rubro'];
            $rs->marca        = $_product['marca'];
            $rs->fk_idSatate  = 1;
            $rs->update();
        }
    }

    public static function createTag($_tag) {

        $rs = TagProduct::where("codeProdSys", "=", $_tag['codeProdSys'])->where("tag", "=", $_tag['tag'])->first();

        if (! is_null($_tag['tag']) && ! is_null($_tag['codeProdSys'])) {
            if (! $rs) {
                $tag              = new TagProduct();
                $tag->tag         = @$_tag['tag'];
                $tag->codeProdSys = @$_tag['codeProdSys'];
                $tag->fk_idSatate = 1;
                $tag->save();
            } else {
                $tag              = new TagProduct();
                $tag->fk_idSatate = 1;
                $tag->update();
            }
        }
    }

    public static function getAllTags() {

        $response = TagProduct::select("tag")->distinct('tag')->orderBy("tag")->get();

        return response()->json($response, 202);
    }

    public static function getAllRubros() {

        $response = Producto::select("rubro")->distinct('rubro')->orderBy("rubro")->get();

        return response()->json($response, 202);
    }

    public static function getAllMarcas() {
        $response = Producto::select("marca")->distinct('marca')->orderBy("marca")->get();

        return response()->json($response, 202);
    }

    public static function searchMarca($search = null) {

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

    public function listarSubrubro1() {
        $response = Producto::select("SubRubro1")->distinct('SubRubro1')->orderBy("SubRubro1")->get();

        return response()->json($response, 202);
    }

    public function listarSubrubro2() {
        $response = Producto::select("SubRubro2")->distinct('SubRubro2')->orderBy("SubRubro2")->get();

        return response()->json($response, 202);
    }

    public function filtro3pack(Request $request) {

        /*Recibe: rubro, SubRubro1, SubRubro2*/

        if ($request->all() == []) {
            $response = [
                'msj' => 'Debe seleccionar algun criterio de busqueda (Recibe: rubro, SubRubro1, SubRubro2)',
            ];

            return response()->json($response, 401);

        } else {

            $busqueda_rubro     = $request->rubro;
            $busqueda_SubRubro1 = $request->SubRubro1;
            $busqueda_SubRubro2 = $request->SubRubro2;
            $result             = [];

            if (! is_null($busqueda_rubro)) {
                $f1 = Producto::where('rubro', $busqueda_rubro)->get();
                foreach ($f1 as $f) {
                    $result[] = $f;
                }
            }

            if (! is_null($busqueda_SubRubro1)) {
                $f2 = Producto::where('SubRubro1', $busqueda_SubRubro1)->get();
                foreach ($f2 as $f) {
                    $result[] = $f;
                }

            }

            if (! is_null($busqueda_SubRubro2)) {
                $f3 = Producto::where('SubRubro2', $busqueda_SubRubro2)->get();
                foreach ($f3 as $f) {
                    $result[] = $f;
                }
            }

            $result_unico = array_unique($result);


            $response = [
                'msj'       => 'Lista de productos',
                'productos' => $result_unico,
            ];

            return response()->json($response, 201);


        }

    }

    public function loMasVendido() {
        /*$LMV = DB::select('SELECT tb_productos.* FROM tb_order_body')
            ->join('tb_order_header', 'tb_order_header.idOrderHeader', 'tb_order_body.fk_idOrderHeader')
            ->join('tb_productos', 'tb_productos.codeProdSys', 'tb_order_body.codeProdSy')
            ->where('tb_order_header.fk_idStateOrder', 2)
            ->get();*/

        $LMV = DB::connection('mysql')->select("SELECT tb_productos .*
         FROM tb_order_body 
         INNER JOIN tb_order_header ON tb_order_header.idOrderHeader = tb_order_body.fk_idOrderHeader 
         INNER JOIN tb_productos ON tb_productos.codeProdSys = tb_order_body.codeProdSys 
         WHERE tb_order_header.fk_idStateOrder = 2 
         GROUP BY tb_productos.idProducto,tb_productos.nombre,tb_productos.titulo,
         tb_productos.urlImage,tb_productos.promocion,
         tb_productos.fk_idSatate,tb_productos.isOutstanding,
         tb_productos.fechaIsOutstanding,tb_productos.codeProdSys,
         tb_productos.kiloProdcuto,tb_productos.rubro,
         tb_productos.marca,tb_productos.SubRubro1,
         tb_productos.SubRubro2,tb_productos.precioL1,
         tb_productos.precioL2,tb_productos.precioL3,
         tb_productos.precioL4,tb_productos.precioL5,
         tb_productos.precioL6,tb_productos.precioL7,
         tb_productos.precioL8,tb_productos.precioL9");

        return response()->json($LMV, 201);
    }

    public function listarPorid($idProducto) {

        $productos = Producto::findOrFail($idProducto);

        return response()->json($productos, 200);
    }


    public function getProductByRubroTag(Request $request) {

        try {
            $rs = null;

            $sql = "";

            if (! empty($request->tag)) {
                $sql = " where Descripcion_TablaGenerica in  ('".$request->tag."') ";
            }

            if (! empty($request->rubro) && ! empty($request->tag)) {
                $sql = $sql." and Descripcion_Rubro = '".$request->rubro."' ";
            }

            if (! empty($request->rubro) && empty($request->tag)) {
                $sql = $sql." where Descripcion_Rubro = '".$request->rubro."' ";
            }

            if ((empty($request->rubro) && empty($request->tag)) && ! empty($request->search)) {
                $sql = $sql." where Descripcion_Producto = like '%".$request->search."%' ";
            }

            if ((! empty($request->rubro) || ! empty($request->tag)) && ! empty($request->search)) {
                $sql = $sql." and   Descripcion_Producto = like '%".$request->search."%' ";
            }


            $rs = DB::connection('sqlsrv')->select(" SELECT * FROM   VistaProductosTagsAPP  
             ".$sql."  order by Descripcion_Producto  ");


            if ($rs != null) {
                return response()->json($rs, 200);
            } else {
                return response()->json("Sin resultados", 204);
            }
        } catch (\Exception $e) {
            dd($e);

            return response()->json("Error conectando a el DC", 500);
        }

    }

    public static function searchProductosMarca($search = null) {


        if (! is_null($search)) {
            $busqueda = $search."%";
            $response = Producto::where('marca', 'like', $busqueda)->orderBy("marca")->get();

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
