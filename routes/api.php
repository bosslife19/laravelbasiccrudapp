<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController as ApiUserController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function (){
    Route::post("/logout", [AuthController::class, 'logout']);
    Route::get('/user', function(Request $request){
        return $request->user();
    });

    Route::apiResource('/users', ApiUserController::class);
});


Route::post('/todo', [TodoController::class, 'createTodo']);
Route::delete('/todo/{id}', [TodoController::class, 'deleteTodo']);
Route::get('/todo', [TodoController::class, 'getTodo']);
Route::post("/signup", [AuthController::class, 'signup']);
Route::post("/signupnew", [AuthController::class, 'signupnew']);
Route::post("/loginnew", [AuthController::class, 'loginnew']);
Route::post('register', [UserController::class, 'register']);


Route::post("/login", [AuthController::class, 'login']);


