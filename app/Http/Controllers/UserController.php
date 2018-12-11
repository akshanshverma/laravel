<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;

use Validator;
use App\Events\UserRegistered;

/**
 * UserController is a controller which have function to login user register get user data etc 
 */
class UserController extends Controller
{
    /**
     * function login is to take user email and password and check the both are valid or not 
     * if valid then create token and return response
     * 
     * @return json response
     */
    public function Login()
    {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $time = $user->email_verified_at;
            if (!$time) {
                return response()->json(['error' => 'user is not verified'], 221);
            }
            $success['token'] = $user->createToken('fundoonotes')->accessToken;
            $email = Auth::user()->email;
            return response()->json(['success' => $success], 200);
        } else {
            return response()->json(['error' => 'unauthorised'], 220);
        }
    }

    /**
     * register funtion is to take user data and check that data is validate or not then send respose
     * 
     * @param Request 
     * @return json response
     */
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'rpassword' => 'required|same:password',
        ]);

        if ($validator->fails()) {

            return response()->json(['error' => $validator->errors()], 210);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $input['token'] = str_random(60);
        $user = User::create($input);
        event(new UserRegistered($user));
        return response()->json(['successful'], 200);
    }

    public function verifyMail()
    {
        $inputToken = request('token');
        $user = User::where('token', $inputToken)->first();
        $time = $user->email_verified_at;
        if (!$time) {
            if (!$user) {
                return response()->json(['not found'], 220);
            }
            $user->email_verified_at = now();
            $user->save();
            return response()->json(['verified successfully'], 201);
        }else {
            return response()->json(['already verified'], 222);
        }
    }

    public function checkVerification()
    {
        $token = request('token');
        $user = User::where('token', $token)->first();
        $time = $user->email_verified_at;
        
        if (!$time) {
            return response()->json(['not verified'], 200);
        } else {
            return response()->json(['already verified'], 201);
        }      
    }

    /**
     * funtion getData is to take user is to take user data form the database
     * only if user is authenticated 
     * 
     * @return json respomse
     */
    public function getData()
    {
        if (Auth::check()) {
            return response()->json(['userData' => Auth::user()], 200);
        } else {
            return response()->json(['error' => 'unauthorised'], 220);
        }

    }

    /**
     * 
     */
    public function Logout()
    {
        Auth::user()->token()->revoke();
        return Response(['message' => 'You are successfully logged out'], 200);

    }
}
