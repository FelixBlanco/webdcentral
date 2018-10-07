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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix' => 'v1','middleware' => 'cors'],function(){
	
	// Config Home
	Route::get('config-home','ConfigHomeController@getConfigHome')->name('config-home');
	Route::post('upgrade_config_home','ConfigHomeController@upgradeConfigHome')->name('upgrade_config_home');	
	
	// Config Footer
	Route::get('config-footer','ConfigFooterController@getInfo')->name('config-footer');
	Route::post('update-config-footer','ConfigFooterController@updateInfo')->name('update-config-footer');

});	


