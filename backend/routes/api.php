<?php

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

Route::group(['prefix' => 'auth'], function () {

    Route::post('login', 'API\AuthController@login'); //logear

    Route::group(['middleware' => 'auth:api'], function () {

        Route::post('crearGaleriaHomeProd', 'GaleriaHomeProductoController@createGaleria');
        Route::delete('borrraGaleriaHomeProd/{idGaleriaHomeProducto}', 'GaleriaHomeProductoController@destroy');

        Route::get('logout', 'API\AuthController@logout');//cerrar sesion
        Route::get('getUser', 'API\AuthController@user');//Obtener usuarios autenticados

        Route::resource('galeriaHome', 'GaleriaHomeController'); //Para galeria Home

        Route::post('createSlides', 'SlideController@createSlides'); //Para que un user admin cree un slide

        Route::delete('destroySlides/{idSlide}', 'SlideController@destroy'); //Para que un user admin elimine un slide

        Route::resource('sugerencias-reclamos', 'ReclamoSugerenciaController');   //sugerencias y reclamos

        Route::get('obtenerStatus-sugerencias-reclamos', 'ReclamoSugerenciaController@obtenerStatus');  //para obtener los posibles estatus de un reclamo
        Route::put('cambiarStatus-sugerencias-reclamos/{idReclamosSugerencia}', 'ReclamoSugerenciaController@cambiarStatus');  //para cambiar el estatus del reclamo debe enviar en data fk_idStatusReclamo que correponda con el id del status_reclamo, y el id del reclamo a actualizar

        Route::resource('colores', 'ColorController');   //Colores de la web

        /*REDES SOCIALES*/
        Route::post('crearRedSocial', 'RedSocialController@store');
        Route::put('updateRedesSociales/{id_RedSocial}', 'RedSocialController@updateRedesSociales');
        /*REDES SOCIALES*/

        /*ORDER BODY (carrito de compra)*/
        Route::post('añadirOrderBody/{fk_idOrderHeader}', 'OrderBodyController@añadir');
        /*ORDER BODY (carrito de compra)*/

        /*ORDER HEADER (Orden de compra)*/
        Route::post('añadirOrderHeader', 'OrderHeaderController@añadir');

         /*ORDER HEADER (Orden de compra)*/
         Route::post('get/data/pago', 'OrderHeaderController@getDataPay');

        /*ORDER HEADER (Orden de compra)*/

        // Cupones
        Route::post('cupons', 'CouponsController@create'); // Crear un cupon
        Route::post('cupons/filter', 'CouponsController@listar'); // Obtener todos los cupones
        Route::get('cupons/{idCoupons}', 'CouponsController@listarPorId');// Obtener cupones por id
        Route::post('cupons/obaint', 'CouponsController@obtenerCupon'); // Obtener cupon por parte del cliente
        Route::get('canjearCupons/{idCuponsClient?}', 'CouponsController@chague');// Canjear cupon por cliente
        Route::delete('borrarCupons/{idCuponsClient?}', 'CouponsController@deleteCuponCliente');// Eliminar cupon por cliente
        Route::get('listarTodosCupones', 'CouponsController@listarTodo'); //listar todo los cupones
        Route::post('updateCupon/{idCupons}', 'CouponsController@updateCupon'); //acutaliza cupones
        Route::delete('deleteCupon/{idCupons}', 'CouponsController@deleteCupon'); //eliminar el cupon
        Route::get('cupons/listarPorIdUsuario/{fk_idUser}', 'CouponsController@listarPorIdUsuario');// Listar cupon por cliente

        // Notification
        Route::post('notification', 'NotificationController@add'); // Crear  Notification
        Route::get('listarNotificationes', 'NotificationController@listar'); // Listar  Notification
        Route::get('notification/byUser/{idUser}', 'NotificationController@getByIdUser');// Obtener Notificaciones  por id usuario
        Route::get('notification/confirm/{idNotification}', 'NotificationController@confirm'); // Listar  Notification

        /* PREGUNTA Y RESPUESTA */
        Route::post('crearPreguntaYRespuesta', 'PreguntasFrecuenteController@crearPreguntaYRespuesta'); //para crear una pregunta y respuesta
        Route::get('verPreguntaORespuesta/{idPreguntaFrecuente}', 'PreguntasFrecuenteController@verPreguntaORespuesta'); //para ver la data de la pregunta y respuesta por su id
        Route::put('editarPreguntaORespuesta/{idPreguntaFrecuente}', 'PreguntasFrecuenteController@editarPreguntaORespuesta'); //para editar
        Route::delete('borrarPreguntaORespuesta/{idPreguntaFrecuente}', 'PreguntasFrecuenteController@borrarPreguntaORespuesta'); //para borrar
        Route::put('cambiarStatus/{idPreguntaFrecuente}', 'PreguntasFrecuenteController@cambiarStatus'); //para cambiar el status
        /* PREGUNTA Y RESPUESTA */

        /*LOCALES ADHERIDOS*/
        Route::post('guardarLocalAdherido', 'LocalesAdheridoController@store');
        Route::post('listarLocalAdheridos', 'LocalesAdheridoController@listar');
        Route::post('listarPorIdLocalAdheridos/{idLocalAdherido}', 'LocalesAdheridoController@listarPorId');
        Route::delete('borrarLocalAdheridos/{idLocalAdherido}', 'LocalesAdheridoController@destroy');
        Route::post('editarLocalAdheridos/{idLocalAdherido}', 'LocalesAdheridoController@editar');
        /*LOCALES ADHERIDOS*/

        /*Clasificados*/
        Route::post('guardarClasificado', 'ClasificadoController@store');

        Route::get('listarPorIdClasificado/{idClasificado}', 'ClasificadoController@listarPorId');
        Route::delete('borrarClasificado/{idClasificado}', 'ClasificadoController@destroy');
        Route::post('editarClasificado/{idClasificado}', 'ClasificadoController@editar');
        /*Clasificados*/

        /*SERVICIOS*/
        Route::post('crearServicioAdd', 'ServiciosAddController@crearServicioAdd');
        Route::post('editarServicioAdd', 'ServiciosAddController@editarServicioAdd');
        Route::delete('eliminarServicioAdd/{idServiciosAdd}', 'ServiciosAddController@eliminarServicioAdd');
        Route::get('listarServiciosAdd', 'ServiciosAddController@listar');
        /*SERVICIOS*/

        /*TURNOS*/
        Route::post('addTurno', 'TurnoController@add');
        Route::post('editTurno/{idTurnos}', 'TurnoController@update');
        Route::get('listarTodoslosTurnos', 'TurnoController@listar');
        Route::delete('borrarTurno/{idTurnos}', 'TurnoController@borrar');
        Route::get('listarPorIdTurno/{idTurnos}', 'TurnoController@listarPorId');
        /*TURNOS*/

        Route::put('cambiarStatusGaleria/{idGaleriaHomeProducto}', 'GaleriaHomeProductoController@cambiarStatus');

        /*CLASIFICADO DE RECLAMO */
        Route::post('addClasificadoReclamo', 'ClasificadoReclamoController@add');
        Route::post('editClasificadoReclamo/{idClasificadoReclamo}', 'ClasificadoReclamoController@edit');
        Route::delete('borrarClasificadoReclamo/{idClasificadoReclamo}', 'ClasificadoReclamoController@borrar');
        Route::get('listarClasificadoReclamo', 'ClasificadoReclamoController@listar');
        Route::get('listarPorIdClasificadoReclamo/{idClasificadoReclamo}', 'ClasificadoReclamoController@buscarIdClasificadoReclamo');

        /*BLOG */
        Route::post('addBlog', 'BlogController@add');
        Route::post('editBlog/{idBlogCategoria}', 'BlogController@edit');
        Route::delete('borrarBlog/{idBlogCategoria}', 'BlogController@borrar');

        /*CATEGORIA DEL BLOG */
        Route::post('addCatBlog', 'BlogCategoriaController@add');
        Route::post('editCatBlog/{idBlogCategoria}', 'BlogCategoriaController@edit');
        Route::delete('borrarCatBlog/{idBlogCategoria}', 'BlogCategoriaController@borrar');

        /* HORARIO DE ATENCION */
        Route::resource('horario-atencion','HorarioAtencionController');
        Route::get('delete-horario-atencion/{id}','HorarioAtencionController@destroy');
        
    });
});

/*TODO NUESTRO GRUPO DE RUTAS*/

Route::group(['prefix' => 'v1', 'middleware' => 'cors'], function () {

    Route::get('listarPorIdClasificado/{fk_idClasificado}','LocalesAdheridoController@listarPorIdClasificado');

    Route::get('turnoDeUnLocalAdh/{id_Local}','LocalesAdheridoController@turnoDeUnLocalAdh');

    Route::get('listarDomiciliosDeClientes/{idCliente}','PerfilClientesController@listarDomiciliosDeClientes');


    Route::post('listarClasificado', 'ClasificadoController@listar');

    Route::post('add/pago', 'OrderHeaderController@safePago');


    Route::post('listar', 'PreguntasFrecuenteController@listar'); //para listar todas las preguntas y respuetas, con filtros offset y  limit

    /*PARA LOS DESTACADOS*/

    Route::post('crearDestacado', 'DestacadoController@crearDestacado');
    Route::put('editarDestacado/{idDestacado}', 'DestacadoController@editarDestacado');
    Route::delete('eliminarDestacado/{idDestacado}', 'DestacadoController@eliminarDestacado');
    Route::get('obtenerDestacados', 'DestacadoController@listar');

    /*PARA LOS DESTACADOS*/

    Route::post('crer-serviciosWeb', 'ServiciosWebController@crer');

    /*Para crear una nueva suscripcion*/
    Route::post('nuevaSus', 'SuscripcionController@nuevaSus');

    /*Para camiar el estatus a una suscripcion*/
    Route::put('cambiarStatusSus/{idSuscripcion}', 'SuscripcionController@cambiarStatusSus');

    /*para cancelar una suscripcion*/
    Route::put('cancelarSus/{idSuscripcion}', 'SuscripcionController@cancelarSus');

    /*Listar suscriciones activas*/
    Route::get('listarSuscripciones', 'SuscripcionController@listarSuscripciones');

    /*Listar suscriciones canceladas*/
    Route::get('listarSuscripcionesCanceladas', 'SuscripcionController@listarSuscripcionesCanceladas');

    /* buscar si un email esta suscrito*/
    Route::get('buscarSuscripcionPorEmail/{email}', 'SuscripcionController@buscarSuscripcionPorEmail');

    /*para las ofertas*/
    Route::resource('ofertas', 'OfertaController');

    Route::get('ofertas/getImagenOferta/{imagenOferta}', 'OfertaController@getImagenOferta');

    Route::get('getGaleria/producto/{imagen}', 'GaleriaHomeProductoController@getGaleriaImage');
    Route::get('getGaleria/producto', 'GaleriaHomeProductoController@listar');
    Route::get('getGaleria/{idGaleriaHomeProducto}', 'GaleriaHomeProductoController@listarPorId');

    /* con esta ruta se busca y retorna la imagen del slider Slides*/
    Route::get('getSlides/imagen/{imagen}', 'SlideController@getSlideImage');

    /* con esta ruta se busca y envian todos los Slides*/
    Route::get('getSlides', 'SlideController@listar');

    /* con esta ruta se busca y envia el Slides con ese id*/
    Route::get('getSlides/{idSlide}', 'SlideController@listarPorId');

    /* con esta ruta se busca y envian todos los productos*/
    Route::post('getProductos', 'ProductoController@listar');

    /*Todo los productos */
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

    Route::resource('user', 'UserController')->except([
        'update',
    ]);  // User CRUD

    Route::post('user/{user}', 'UserController@update')->name('user.update');
    Route::post('listarUsers', 'UserController@listar');
    Route::put('user/update/tokenfb/{idUser}', 'UserController@updateTokenFirebase');

    Route::put('setClave/{api_token}', 'UserController@setClave'); // Cambio de clave

    Route::post('reestablecerClave', 'UserController@reestablecerClave'); // recibe email y genera clave aleatoria, posterior envia email para el login

    // Actualizamos las imagenes de perfil
    Route::post('upgrade-foto-perfil', 'UserController@upgradeFotoPerfil');

    //AGREGAR IMAGEN DE PERFIL
    Route::post('addFotoPerfilUser', 'UserController@addFotoPerfil');

    /*con esta puede tener acceso a una foto de perfil en streaming*/
    Route::get('getFotoPerfil/{nombreImagen}', 'UserController@getFotoPerfil');

    /*con esta puede tener acceso a una imagen de la galeria en streaming*/
    Route::get('galeriaHome/{nombreImagen}', 'GaleriaHomeController@getgaleriaHome');

    // Config Home
    Route::get('config-home', 'ConfigHomeController@getConfigHome')->name('config-home');
    Route::post('upgrade_config_home', 'ConfigHomeController@upgradeConfigHome')->name('upgrade_config_home');
    Route::post('addImagenFooter','ConfigFooterController@addImagenFooter');

    // Config Footer
    Route::get('config-footer', 'ConfigFooterController@getInfo')->name('config-footer');
    Route::post('update-config-footer', 'ConfigFooterController@updateInfo')->name('update-config-footer');

    // Conexion External SYS //
    Route::post('get/order/bydriver', 'OrderDriverController@getAllByEmailDriver');

    // Paleta de color para el landing
    Route::get('paleta-color', 'ColorController@ultimaPaletaColores');

    // Sincronizador de productos
    Route::get('sincronize/product', 'ProductSincronizeController@sicronizeProduct');

    // OBTENER TAGS
    //Route::get('tags/filter', 'ProductoController@getAllTags');

    // OBTENER RUBROS
    Route::get('rubro/filter', 'ProductoController@getAllRubros');

    // OBTENER SUBSUBROS1
    Route::get('rubro/listarSubrubro1/{rubro}', 'ProductoController@listarSubrubro1');

    // OBTENER SUBSUBROS2
    Route::get('rubro/listarSubrubro2/{Subrubro1}', 'ProductoController@listarSubrubro2');

    //LISTAR PRODUCTOS POR RUBRO,TAG
    Route::post('producto/by/fiter', 'ProductoController@getProductByRubro');

    //LISTAR POR RUBRO, SURUBRO1 O SUBRUBRO2
    Route::post('filtro3pack', 'ProductoController@filtro3pack');

    // OBTENER MARCAS
    Route::get('marcas/filter', 'ProductoController@getAllMarcas');

    // COSTOS DE ENVIO //
    Route::get('cost/delivery', 'ProductoController@getCostos');

    // OBTENER MARCAS CON SEARCH
    Route::get('marcas/{search?}', 'ProductoController@searchMarca');

    /*OBTENER TODOS LOS PRODUCTOS POR LA MARCA SOLICITADA (search)*/
    Route::get('buscar/prod/porMarcas/{search?}', 'ProductoController@searchProductosMarca');

    // Obtener pedidos de un chofer
    Route::post('order/all/driver', 'OrderDriverController@getAllByCodeDriver');

    // Obtener pedidos de un cliente
    Route::post('order/all/client', 'OrderDriverController@getAllByCodeCliente');

    // Obtener pedidos de un cliente 
    Route::get('order/all/trafic', 'OrderDriverController@getAllOrderMap');

    // Obtener pedidos actuales de un chofer
    Route::post('order/active/driver', 'OrderDriverController@getByCodeDriver');

    //
    Route::post('update/info/client', 'OrderDriverController@chaguePhoneAndAdrresClinet');

    // Obtener productos de  un pedido
    Route::post('order/all/products', 'OrderDriverController@getProductByPedido');

    // CAMBIAR ESTADAO DE UN PEDIDO
    Route::post('order/changue/state', 'OrderDriverController@chagueEstadoPedido');

    //  FINALIZAMOS UN PEDIDO ESTADAO DE UN PEDIDO
    Route::post('order/finish', 'OrderDriverController@finishPedido');

    // PREFINALIZAMOS   UN PEDIDO ESTADAO DE UN PEDIDO
    Route::post('order/pre/finish', 'OrderDriverController@prefinishPedido');

    // ORDENES PRE FINALIZADAS DE UN CLIENTE
    Route::get('orders/prefiish/{fk_idUser}', 'OrderHeaderController@listarPorIdUsuario');// Listar cupon por cliente

    // DEVOLVER  DE UN PEDIDO
    Route::post('order/devolution/product', 'OrderDriverController@devolutionProduct');

    // DEVOLVER  DE UN PEDIDO
    Route::post('order/exist/product', 'OrderDriverController@existProduct');

    // para el buscador general
    Route::get('buscarGeneral/{search?}', 'ProductoController@buscarGeneral');

    // Todos los perfiles
    Route::get('perfiles', 'PerfilController@getPerfil');

    //para listar Las SeccionApp
    Route::get('listarSeccionApp', 'SeccionAppController@listar');

    //Lo mas vendido
    Route::get('loMasVendido', 'ProductoController@loMasVendido');

    Route::post('crearPerfilCliente', 'PerfilClientesController@store');
    Route::put('actualizarPerfilCliente/{idPerfilCliente}', 'PerfilClientesController@update');
    Route::delete('eliminarPerfilCliente/{idPerfilCliente}', 'PerfilClientesController@destroy');
    Route::get('perfilesClientes/listar', 'PerfilClientesController@listar');
    Route::get('get-perfil-cliente/{id}', 'PerfilClientesController@getPerfil');

    //Listar los productos del body a travez del idOrderHeader
    Route::get('listarProductosBodyPorIdOrferHeader/{fk_idOrderHeader}', 'OrderBodyController@listarProductosBodyPorIdOrferHeader');

    //listar todas las cabeceras de las ventas que se han hecho
    Route::get('historialVentas/{id_cliente}', 'OrderBodyController@historialVentas');

    Route::get('producto/listarPorid/{idProducto}', 'ProductoController@listarPorid');

    // Links de redes sociales
    Route::get('get-redes', 'RedSocialController@getRedes');

    // Status Sistema 
    Route::get('status-sistema', 'StatusSistemaController@index');

    // Tipos de Facturas 
    Route::get('tipo-facturas', 'tipoDeFacturaController@getTipoFacturas');

    /*PARA LAS CATEGORIAS DEL BLOG*/

    Route::get('listarCatBlog', 'BlogCategoriaController@listar');
    
    Route::get('listarPorIdCatBlog/{idBlogCategoria}', 'BlogCategoriaController@buscarIdBlogCategoria');

    /*PARA el BLOG*/
    Route::get('listarBlog', 'BlogController@listar');
    Route::get('listarPorIdBlog/{idBlogCategoria}', 'BlogController@buscarIdBlogCategoria');

    /*PARA LISTAR LOS BLOGS POR ID DE CATEGORIA DE BLOG*/
    Route::get('listarBlogPorIdDeCategoria/{idBlogCategoria}','BlogController@listarBlogPorIdDeCategoria');

    /*PARA LISTAR LOS ESTATUS DE LOS TURNOS*/
    Route::get('listarTodoslosEstatusTurnos', 'TurnoController@listarTodoslosEstatusTurnos');

    Route::get('client/ml/byid/{user}', 'OrderDriverController@getClientMlByUser');
    Route::post('client/ml/add', 'OrderDriverController@addClientMl');
    Route::post('client/ml/update', 'OrderDriverController@updateClienteMl');

    /*** CLASIFICADOS ****/
    Route::get('lista-por-nro/{id}','ClasificadoController@listaPorNro');

    /*** LOCALES ADHERIDOS ****/
    Route::get('lista-locales-por-nro/{id}','LocalesAdheridoController@listaLocalesPorNro');

    // Tipos de descuentos 
    Route::get('tipo-descuentos','TipoDescuentoController@index');
});





