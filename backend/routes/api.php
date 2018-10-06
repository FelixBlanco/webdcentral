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

    //Route::post('/user/register','AuthController@store');

    //Route::post('/user/sigin','AuthController@sigin');

    Route::resource('user', 'UserController');

    //Auth::routes();

});

Route::post('login', 'API\AuthController@login');
Route::post('register', 'API\AuthController@register');

//protected routes
Route::group([ 'middleware' => 'auth:api' ], function() {
    Route::get('logout', 'Auth\LoginController@logout');
    Route::post('details', 'API\AuthController@details');
});

