<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;

use Validator;


class UserController extends Controller
{
    public function Login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('fundoonotes')->accessToken;
            $email = Auth::user()->email;
            return response()->json(['success' => $success], 200);
        } else {
            return response()->json(['error' => 'unauthorised'], 220);
        }
    }


    public function register(Request $request)
    {
        
        $validator = Validator::make($request->all(),[
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'rpassword' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            
            return response()->json(['error'=>$validator->errors()],210);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        return response()->json(['successful'],200);
    }

    public function getData()
    {
        if (Auth::check()) {
            
            return response()->json([Auth::user()],200);
        }
        
    }

    public function Logout()
    {
        Auth::user()->token()->revoke();
        return Response(['code' => 200, 'message' => 'You are successfully logged out'], 200);

    }
}
