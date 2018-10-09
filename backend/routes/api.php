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

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group([ 'prefix' => 'v1', 'middleware' => 'cors' ], function() {

    //Route::post('/user/register','oldAuthController@store');

    //Route::post('/user/sigin','oldAuthController@sigin');

    Route::resource('user', 'UserController');

    //Auth::routes();

});

/*Route::post('login', 'API\oldAuthController@login');
Route::post('register', 'API\oldAuthController@register');

//protected routes
Route::group([ 'middleware' => 'api' ], function() {
    Route::get('logout', 'Auth\LoginController@logout');
    Route::post('details', 'API\oldAuthController@details');
});*/

Route::group([ 'prefix' => 'auth', ], function() {
    Route::post('login', 'API\AuthController@login');
    //Route::post('signup', 'API\AuthController@signup');


    Route::group([ 'middleware' => 'auth:api', ], function() {
        Route::get('logout', 'API\AuthController@logout');
        Route::get('user', 'API\AuthController@user');
    });
});


Route::group(['prefix' => 'v1','middleware' => 'cors'],function(){
	
	// Config Home
	Route::get('config-home','ConfigHomeController@getConfigHome')->name('config-home');
	Route::post('upgrade_config_home','ConfigHomeController@upgradeConfigHome')->name('upgrade_config_home');	
	
	// Config Footer
	Route::get('config-footer','ConfigFooterController@getInfo')->name('config-footer');
	Route::post('update-config-footer','ConfigFooterController@updateInfo')->name('update-config-footer');

});	


