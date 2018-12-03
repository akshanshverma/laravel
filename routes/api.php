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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::any('login','UserController@login')->name('login');
Route::post('register','UserController@register');
Route::group(['middleware' => 'auth:api'],function(){
    Route::any('getDetails','UserController@getData');
    Route::get('logout', 'UserController@logout');

});



//Route::get('logout','Api\LoginController@Logout');
