<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\User;
use App\PasswordReset;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);
        $user = User::where('email', $request->email)->first();
        //dd($user);
        if (!$user)
            return response()->json(
            ['message' => 'We cant find a user with that e - mail address . '],
            205
        );
        $passwordReset = PasswordReset::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => str_random(60)
            ]
        );
        //dd($passwordReset->token);
        if ($user && $passwordReset) {
            $user->notify(
                new PasswordResetRequest($passwordReset->token)
            );
        }
        return response()->json(
            ['message' => 'We have e - mailed your password reset link!'],
            200
        );
    }


    public function find($token)
    {
        $passwordReset = PasswordReset::where('token', $token)->first();
        if (!$passwordReset)
            return response()->json([
            'message' => 'This password reset token is invalid.'
        ], 220);
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 220);
        }
        return response()->json($passwordReset);
    }


    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required',
            'token' => 'required'
        ]);

        $passwordReset = PasswordReset::where([
            ['token', $request->token],
            ['email', $request->email]
        ])->first();

        if (!$passwordReset)
            return response()->json([
            'message' => 'This password reset token is invalid.'
        ], 205);
        
        $user = User::where('email', $passwordReset->email)->first();
        if (!$user)
            return response()->json([
            'message' => 'We cant find a user with that e-mail address.'
        ], 205);
        $user->password = bcrypt($request->password);
        // $pascheck = $user->password;
        $user->save();
        $passwordReset->delete();
        $user->notify(new PasswordResetSuccess($passwordReset));
        return response()->json([
            'message' => 'change.'
        ], 200);
    }
}
 