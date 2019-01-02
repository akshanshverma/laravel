<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Labels;
use Illuminate\Support\Facades\Auth;


class LabelController extends Controller
{
    /**
     * getAllLabel is a function which take label from database and return response with label data 
     * 
     * @return json label data 
     */
    public function getAllLabel()
    {
        $user = Auth::user();
        $id = $user->id;
        $labels = Labels::where('user_id', Auth::user()->id)->get();
        return response()->json($labels, 200);
    }

    /**
     * createLabel is funtion which create new label in the database
     */
    public function createLabel(Request $request)
    {
        if ($user = Auth::user()) {
            $labelData = $request->all();
            $labelData['user_id'] = $user->id;
            $data = Labels::create($labelData);
            if (!$data) {
                return response()->json('cant create label',222);
            }
            return response()->json($data,200);
        }
        return response()->json('unauthorised',220);
    }
}
