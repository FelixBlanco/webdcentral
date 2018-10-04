<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::group(['middleware' => 'auth'], function () {

    Route::get('/', function() {
        return view('welcome');
    });

});



/*Route::get('pdf122', function () {
    return response(\SimpleSoftwareIO\QrCode\Facades\QrCode::generate('Transfórmame en un QrCode!'));
});*/

Route::get('form', 'PdfController@index');


/* Recibe
  array:3 [
  "token" => ""
  "nroMachine" => ""
]*/
Route::post('pdf', 'PdfController@pdf')->name('pdf');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
