<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Labels;
use Illuminate\Support\Facades\Auth;
use App\LabelMap;


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
        $labels = Cache::remember('label' . $id, 5, function () {
            return Labels::where('user_id', Auth::user()->id)->get();
        });
        return response()->json($labels, 200);
    }

    /**
     * createLabel is funtion which create new label in the database
     * 
     * @var Request 
     * @return json label data 
     */
    public function createLabel(Request $request)
    {
        if ($user = Auth::user()) {
            Cache::flush();
            $labelData = $request->all();
            $labelData['user_id'] = $user->id;
            $data = Labels::create($labelData);
            if (!$data) {
                return response()->json('cant create label', 222);
            }
            return response()->json($data, 200);
        }
        return response()->json('unauthorised', 220);
    }

    /**
     * remove label is a function to remove label from label list 
     * 
     * @var Request 
     * @return json 
     */
    public function removeLabel(Request $request)
    {
        if ($user = Auth::user()) {
            Cache::flush();
            $labelData = $request->all();
            $data = Labels::destroy($labelData['id']);
            if ($data === 0) {
                return response()->json('cant delete', 222);
            }
            return response()->json('delete', 200);
        }
        return response()->json('unauthorised', 220);
    }


    /**
     * update label is a function to change the name of the label
     * 
     * @var Request 
     * @return json
     */
    public function updateLabel(Request $request)
    {
        if (Auth::user()) {
            Cache::flush();
            $labelData = $request->all();
            $data = Labels::where('id', $labelData['id'])->first();
            if (!$data) {
                return response()->json('cant update', 222);
            }
            $data->label = $labelData['label'];
            $data->save();
            return response()->json('update', 200);
        }
        return response()->json('unauthorised', 220);
    }

    /**
     * addLabelOnNote is a function to add label on note
     * 
     * @var Request 
     * @return json
     */
    public function addLabelOnNote(Request $request)
    {
        if (Auth::user()) {
            Cache::flush();
            $labelData = $request->all();
            $data = LabelMap::create($labelData);
            if (!$data) {
                return response()->json('label cant created on note', 222);
            }
            return response()->json('label created on note', 200);
        }
    }

    /**
     * removeLabelFromNote is to remove label 
     * 
     * @var Request  
     * @return json
     */
    public function removeLabelFromNote(Request $request)
    {
        if (Auth::user()) {
            Cache::flush();
            $labelMapData = $request->all();
            $data = LabelMap::where('label_id',$labelMapData['label_id'])->where('note_id',$labelMapData['note_id'])->first();
            if (!$data) {
                return response()->json('cant delete', 222);
            }
            $data->delete();

            return response()->json('delete', 200);
        }
        return response()->json('unauthorised', 220);
    }
}
