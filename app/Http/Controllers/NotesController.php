<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\NotesData;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    public function index()
    {
        // $notes = NotesData::all();
        // return response()->json($notes);

    //    $notes = Cache::remember('NotesData',5,function ()
    //    {
    //        return NotesData::all();
    //    });
    //    return response()->json($notes);
    }

    public function createNote(Request $request)
    {
        if ($user = Auth::user()) {
            $id = $user->id;
            $noteData = $request->all();
            $input = [
                'user_id' => $id,
                'title' => $noteData['title'],
                'note' => $noteData['note']
            ];
            $data = NotesData::create($input);
            return response()->json(['userData' => $data], 200);
        } else {
            return response()->json(['error' => 'unauthorised'], 220);
        }

    }

    public function getAllNotes()
    {   
        $user = Auth::user();
        $id = $user->id;
        $notes = Cache::remember($id, 5, function () {
            return NotesData::where('user_id', Auth::user()->id)->get();
        });
        return response()->json($notes);
    }

}
