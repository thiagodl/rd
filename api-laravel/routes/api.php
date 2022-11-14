<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('clients', 'App\Http\Controllers\ApiController@getAllClients');
Route::get('clients/{search}', 'App\Http\Controllers\ApiController@getClient');
Route::post('clients', 'App\Http\Controllers\ApiController@createClient');
Route::delete('clients/{id}','App\Http\Controllers\ApiController@deleteClient');