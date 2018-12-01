<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function Login()
    {
        if (Auth::attempt(['email' => request('email'), 'password'=>request('password')])) {
            $user = Auth::user();
            $success['token'] = $user->creatToken('fundoonotes')->accessToken;
            return response()->json(['success' => $success],200);
        }else {
            return response()->json(['error' => 'unauthorised'],401);
        }
    }
}
