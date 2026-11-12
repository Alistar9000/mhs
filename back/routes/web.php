<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/login', function (Request $request) {

    // User::create([
    //     'name' => 'علی مصدق',
    //     'username' => $request->username,
    //     'password' => $request->password
    // ]);

    $credentials = $request->validate([
        'username' => ['required'],
        'password' => ['required'],
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $request->session()->regenerate();

    return response()->json(['message' => 'Logged in successfully']);
});

Route::post('/api/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json(['message' => 'Logged out']);
});

Route::middleware('auth:sanctum')->get('/api/user', function (Request $request) {
    return $request->user();
});