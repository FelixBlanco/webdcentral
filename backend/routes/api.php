<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([ 'prefix' => 'auth' ], function() {

    Route::post('login', 'API\AuthController@login');//logear

    Route::group([ 'middleware' => 'auth:api' ], function() {

        Route::get('logout', 'API\AuthController@logout');//cerrar sesion
        Route::get('getUser', 'API\AuthController@user');//Obtener usuarios autenticados
        Route::resource('galeriaHome', 'GaleriaHomeController'); //Para galeria Home

        Route::post('createSlides', 'SlideController@createSlides'); //Para que un user admin cree un slide

        Route::resource('sugerencias-reclamos', 'ReclamoSugerenciaController');   //sugerencias y reclamos

        Route::get('obtenerStatus-sugerencias-reclamos', 'ReclamoSugerenciaController@obtenerStatus');  //para obtener los posibles estatus de un reclamo
        Route::put('cambiarStatus-sugerencias-reclamos/{idReclamosSugerencia}', 'ReclamoSugerenciaController@cambiarStatus');  //para cambiar el estatus del reclamo debe enviar en data fk_idStatusReclamo que correponda con el id del status_reclamo, y el id del reclamo a actualizar

        Route::resource('colores', 'ColorController');   //Colores de la web
    });
});


/*TODO NUESTRO GRUPO DE RUTAS*/

Route::group([ 'prefix' => 'v1', 'middleware' => 'cors' ], function() {

    /*Para crear una nueva suscripcion*/
    Route::post('nuevaSus', 'SuscripcionController@nuevaSus');

    /*Para camiar el estatus a una suscripcion*/
    Route::put('cambiarStatusSus/{idSuscripcion}','SuscripcionController@cambiarStatusSus');

    /*para cancelar una suscripcion*/
    Route::get('cancelarSus/{idSuscripcion}','SuscripcionController@cancelarSus');

    /*para las ofertas*/
    Route::resource('ofertas', 'OfertaController');

    Route::get('ofertas/getImagenOferta/{imagenOferta}', 'OfertaController@getImagenOferta');

    /* con esta ruta se busca y retorna la imagen del slider Slides*/
    Route::get('getSlides/imagen/{imagen}', 'SlideController@getSlideImage');

    /* con esta ruta se busca y envian todos los Slides*/
    Route::get('getSlides', 'SlideController@listar');

    /* con esta ruta se busca y envia el Slides con ese id*/
    Route::get('getSlides/{idSlide}', 'SlideController@listarPorId');

    /* con esta ruta se busca y envian todos los productos*/
    Route::post('getProductos', 'ProductoController@listar');

    /* Todo los productos */
    Route::get('getAllProductos', 'ProductoController@index');

    /* con esta ruta se activa isOutstanding*/
    Route::get('onIsOutstanding/{idProducto}', 'ProductoController@onIsOutstanding');

    /* con esta ruta se desactiva isOutstanding*/
    Route::get('offIsOutstanding/{idProducto}', 'ProductoController@offIsOutstanding');

    /* con esta ruta se listo los productos por isOutstanding*/
    Route::get('listarPorIsOutstanding', 'ProductoController@listarPorIsOutstanding');


    /* con esta ruta se busca y envian todos los productos que correspondan con la inicial del producto*/
    Route::get('getProductos/{nombre}', 'ProductoController@listarPorNombre');

    Route::get('enviarCorreo', 'CorreoController@enviarCorreo');

    Route::resource('user', 'UserController');    // User CRUD
    Route::post('listarUsers', 'UserController@listar');

    Route::put('setClave/{api_token}', 'UserController@setClave'); // Cambio de clave

    Route::post('reestablecerClave', 'UserController@reestablecerClave'); // recibe email y genera clave aleatoria, posterior envia email para el login

    // Actualizamos las imagenes de perfil
    Route::post('upgrade-foto-perfil', 'UserController@upgradeFotoPerfil');

    /*con esta puede tener acceso a una foto de perfil en streaming*/
    Route::get('getFotoPerfil/{nombreImagen}', 'UserController@getFotoPerfil');

    /*con esta puede tener acceso a una imagen de la galeria en streaming*/
    Route::get('galeriaHome/{nombreImagen}', 'GaleriaHomeController@getgaleriaHome');

    // Config Home
    Route::get('config-home', 'ConfigHomeController@getConfigHome')->name('config-home');
    Route::post('upgrade_config_home', 'ConfigHomeController@upgradeConfigHome')->name('upgrade_config_home');

    // Config Footer
    Route::get('config-footer', 'ConfigFooterController@getInfo')->name('config-footer');
    Route::post('update-config-footer', 'ConfigFooterController@updateInfo')->name('update-config-footer');

    // Conexion External SYS //
    Route::post('get/order/bydriver', 'OrderDriverController@getAllByEmailDriver');

    // Cupones 
    Route::post('coupns', 'CouponsController@create'); // Crear un cupon
    Route::post('coupns/filter', 'CouponsController@listar'); // Obtener todos los cupones
    Route::get('coupns/{idCoupons}', 'CouponsController@listarPorId');// Obtener cupones por id
    Route::put('coupns/{idCoupons}', 'CouponsController@obtenerCupon'); // Obtener cupon por parte del cliente
    Route::get('coupns/chague/{idCuponsClient}', 'CouponsController@chague');// Canjear cupon por cliente

    // Notification
    Route::post('notification', 'NotificationController@add'); // Crear  Notification

    // Paleta de color para el landing 
    Route::get('paleta-color', 'ColorController@ultimaPaletaColores');
});


