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

        Route::post('createSlides','SlideController@createSlides'); //Para que un user admin cree un slide
    });
});


/*TODO NUESTRO GRUPO DE RUTAS*/

Route::group([ 'prefix' => 'v1', 'middleware' => 'cors' ], function() {

    /*para las ofertas*/
    Route::resource('ofertas', 'OfertaController');

    Route::get('ofertas/getImagenOferta/{imagenOferta}','OfertaController@getImagenOferta');

    /* con esta ruta se busca y retorna la imagen del slider Slides*/
    Route::get('getSlides/imagen/{imagen}','SlideController@getSlideImage');

    /* con esta ruta se busca y envian todos los Slides*/
    Route::get('getSlides','SlideController@listar');

    /* con esta ruta se busca y envia el Slides con ese id*/
    Route::get('getSlides/{idSlide}','SlideController@listarPorId');

    /* con esta ruta se busca y envian todos los productos*/
    Route::get('getProductos','ProductoController@listar');

    /* con esta ruta se busca y envian todos los productos que correspondan con la inicial del producto*/
    Route::get('getProductos/{nombre}','ProductoController@listarPorNombre');

    Route::get('enviarCorreo','CorreoController@enviarCorreo');

    Route::resource('user', 'UserController');    // User CRUD


    Route::put('setClave/{api_token}', 'UserController@setClave'); // Cambio de clave

    // Actualizamos las imagenes de perfil
    Route::post('upgrade-foto-perfil','UserController@upgradeFotoPerfil');


    /*con esta puede tener acceso a una foto de perfil en streaming*/
    Route::get('getFotoPerfil/{nombreImagen}','UserController@getFotoPerfil');

    /*con esta puede tener acceso a una imagen de la galeria en streaming*/
    Route::get('galeriaHome/{nombreImagen}','GaleriaHomeController@getgaleriaHome');
    // Config Home
    Route::get('config-home', 'ConfigHomeController@getConfigHome')->name('config-home');
    Route::post('upgrade_config_home', 'ConfigHomeController@upgradeConfigHome')->name('upgrade_config_home');

    // Config Footer
    Route::get('config-footer', 'ConfigFooterController@getInfo')->name('config-footer');
    Route::post('update-config-footer', 'ConfigFooterController@updateInfo')->name('update-config-footer');

    // CONEXION EXTERNAL SYS //
    Route::post('get/order/bydriver', 'OrderDriverController@getAllByEmailDriver');


});


