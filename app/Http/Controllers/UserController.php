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

            $success['userData'] = [
                'email' => $user->email,
                'username' => $user->username,
            ];
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

            return response()->json(['errors' => $validator->errors()], 210);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $input['token'] = str_random(60);
        $user = User::create($input);
        event(new UserRegistered($user));
        return response()->json(['successful'], 200);
    }

    /**
     * verifyMail is to take of the user and verify the user 
     * 
     * @return json response
     */
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
        } else {
            return response()->json(['already verified'], 222);
        }
    }

    /**
     * checkVerification is to check that user is verify or not 
     * @return  json response 
     */
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
     * @return json response
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
     * loginWithSocialAccoount is a function which is user to login and registre user with the 
     * help of social account 
     * 
     * @return json response
     */

    public function loginWithSocialAccoount(Request $request)
    {
        $userData = $request->all();
      
        $UserDetail = User::where('email', $userData['email'])->first();
        // dd($userData);
        if (!$UserDetail) {
            $userData['token'] = str_random(60);
            $userData['password'] = bcrypt($userData['password']);

            //get image file 
            $imgData = file_get_contents($userData['profile_image']);
            // $type = pathinfo($img_path, PATHINFO_EXTENSION);
            $userData['profile_image'] = 'data:image/jpg;base64,'.base64_encode($imgData);



            $user = User::create($userData);
            $user->email_verified_at = now();
            $user->save();
            if (Auth::attempt(['email' => $userData['email'], 'password' => $request['password'] ])) {
                $success['token'] = $user->createToken('fundoonotes')->accessToken;
                $success['userData'] = [
                    'email' => $user->email,
                    'username' => $user->username,
                    'profile_image' => $user->profile_image,
                ];
                return response()->json(['success' => $success], 200);
            }
            return response()->json(['successful register'], 220);
        }
        if (Auth::attempt(['email' => $userData['email'], 'password' => $userData['password']])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('fundoonotes')->accessToken;
            $success['userData'] = [
                'email' => $user->email,
                'username' => $user->username,
                'profile_image' => $user->profile_image,
            ];
            return response()->json(['success' => $success], 200);
        }

    }

    /**
     * uploadProfileImage is to change user profile image
     * 
     * @return json with changed profile image and status of success 
     */
    public function uploadProfileImage(Request $request)
    {   
        
        $file = $request->file('profile_image')->getRealPath();
        $profilePic['profile_image'] = 'data:image/jpg;base64,'.base64_encode(file_get_contents($file));
        $user = Auth::user();
        $user->profile_image= $profilePic['profile_image'];
        $user->save();
        return response()->json(['success' => $user->profile_image], 200);
    }


    /**
     * logout is to logout user account
     */
    public function Logout()
    {
        Auth::user()->token()->revoke();
        return Response(['message' => 'You are successfully logged out'], 200);

    }
}
