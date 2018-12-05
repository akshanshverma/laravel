<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Reminder;
use Mail;
use Sentinel;

class ForgotPasseordController extends Controller
{
   

    public function postForgotPassword(Request $request)
    {
        $user = User::whereEmail($request->email)->first();
        $sentinelUser = Sentinel::findById($user->id);
        if (count($user) == 0) {
            return json_encode("sorry");
        }

        $reminder = Reminder::exists($sentinelUser) ? : Reminder::create($sentinelUser);

        $this->sendEmail($user, $reminder->code);
        return json_encode("done");
    }

    private function sendEmail($user,$code)
    {
        Mail::send('email.forgot-password',[
            'user' => $user,
            'code' => $code
        ],function($message) use ($user){
            $message->to($user->email);
            $message->subject("hello $user->username,reset your password");
        });
    }
}
