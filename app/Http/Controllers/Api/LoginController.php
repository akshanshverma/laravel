<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;

class LoginController extends Controller
{
    public function Login()
    {
        if (Auth::attempt(['email' => request('email'), 'password'=>request('password')])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('fundoonotes')->accessToken;
            return response()->json(['success' => $success],200);
        }else {
            return response()->json(['error' => 'unauthorised'],401);
        }
    }


    public function Logout()
    {
        if (Auth::check()) {
        Auth::user()->AauthAcessToken()->delete();
        }
    }
}

