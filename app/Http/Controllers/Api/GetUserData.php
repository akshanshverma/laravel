<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;

class GetUserData extends Controller
{
    public function getData()
    {
        if (Auth::check()) {
            $email = Auth::user()->email;
            echo $email;
        }
        
    }
}
