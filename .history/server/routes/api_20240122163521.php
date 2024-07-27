<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\ManageGroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\contactController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PhotoController;



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

//User Routes
Route::get('/user', [UserController::class, 'index']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::post('/user', [UserController::class, 'store']);
Route::get('/user/is_registration_allowed/{id}', [UserController::class, 'isRegistrationAllowed']);
Route::put('/user/{id}', [UserController::class, 'update']);
Route::delete('/user/{id}', [UserController::class, 'destroy']);



//follow
Route::get('/contact', [contactController::class, 'index']);
Route::get('/contact/{id}', [contactController::class, 'show']);
Route::put('/contact/like/{id_card}/{contact_id}', [contactController::class, 'updateLike']);
Route::get('/contact/newNotification/{id}', [contactController::class, 'getNewNotification']);
Route::get('/contact/notification/{id}', [contactController::class, 'getNotification']);
Route::put('/contact/notification/{id}', [contactController::class, 'updateNotification']);
Route::get('/contact/following/{id_card}/{page}', [contactController::class, 'getFollowing']);
Route::get('/contact/recent/{id_card}/{page}', [contactController::class, 'getRecent']);
Route::get('/contact/favorite/{id_card}/{page}', [contactController::class, 'getFavorite']);
Route::get('/contact/favorite/{id_card}/{page}/{search}', [contactController::class, 'searchFavorite']);
Route::put('/contact/{id_card}/{contact_id}', [contactController::class, 'updateContact']);
Route::get('/contact/{id_card}/{page}/{search}', [contactController::class, 'search']);
Route::delete('/contact/{id_card}/{contact_id}', [contactController::class, 'destroy']);


//company information
Route::get('/company', [CompanyController::class, 'index']);
Route::get('/company/{id}', [CompanyController::class, 'show']);
Route::post('/company', [CompanyController::class, 'store']);
Route::put('/company/{id}', [CompanyController::class, 'update']);
// Route::get('/contact',[CompanyController::class,'index']);
//Login
Route::post('/login', [UserController::class, 'login']);
//Logout
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

//photos
Route::post('/photos', [PhotoController::class, 'upload']);

//group
Route::get('/group/{id}', [GroupController::class, 'show']);
Route::post('/group', [GroupController::class, 'store']);
Route::get('/group', [GroupController::class, 'index']);
Route::get('/groups/{page}', [GroupController::class, 'group']);
Route::get('/group/{page}/{search}', [GroupController::class, 'searchGroup']);
Route::delete('/group/{id}', [GroupController::class, 'destroy']);

//manage group
Route::get('/manage/{id}', [ManageGroupController::class, 'show']);
Route::get('/manage/group/{id_card}', [ManageGroupController::class, 'checkId']);
Route::get('/manage/{group_id}/{id_card}', [ManageGroupController::class, 'check']);
Route::post('/manage', [ManageGroupController::class, 'store']);
Route::get('/manage', [ManageGroupController::class, 'index']);
Route::delete('/manage/{group_id}/{id_card}', [ManageGroupController::class, 'destroy']);
