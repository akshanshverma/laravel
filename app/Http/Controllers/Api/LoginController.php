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
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('fundoonotes')->accessToken;
            $email = Auth::user()->email;
            return response()->json(['success' => $success], 200);
        } else {
            return response()->json(['error' => 'unauthorised'], 401);
        }
    }


    public function Logout(Request $request)
    {
        $value = $request->bearerToken();
        if ($value) {
     
            $id = (new Parser())->parse($value)->getHeader('jti');
            $revoked = DB::table('oauth_access_tokens')->where('id', '=', $id)->update(['revoked' => 1]);
            $this->guard()->logout();
        }
        Auth::logout();
        return Response(['code' => 200, 'message' => 'You are successfully logged out'], 200);

    }
}

