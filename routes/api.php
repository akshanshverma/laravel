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

Route::get('/', function () {
    $r = app()->make('redis');
    $r->set("key1", "test");
    return $r->get("key1");
});

Route::any('login', 'UserController@login')->name('login');


Route::post('register', 'UserController@register');
Route::get('verifymail/{token}', 'UserController@verifyMail');
Route::get('checkverification/{token}', 'UserController@checkVerification');


Route::group(['middleware' => 'auth:api'], function () {
    Route::post('createnote', 'NotesController@createNote');
    Route::get('getAllNotes', 'NotesController@getAllNotes');
    Route::any('getDetails', 'UserController@getData');
    Route::get('logout', 'UserController@logout');

});


Route::group([
    'namespace' => 'Auth',
    'middleware' => 'api',
    'prefix' => 'password'
], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
    Route::post('reset', 'PasswordResetController@reset');

});








