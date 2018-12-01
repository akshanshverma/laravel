<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;

class RegisterController extends Controller
{
    public function register()
    {
        $validator = Validator::make(request()->all(),[
            'username' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'rpassword' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->error()],401);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] = $user->createToken('fundoonotes')->accessToken;
        $success['username'] = $user->username;
        
        return response()->json(['success'=>$success],200);
    }
}
