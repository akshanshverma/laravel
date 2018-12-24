<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Facades\App\NotesData;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    public function index()
    {
     
    }

    public function createNote(Request $request)
    {
        if ($user = Auth::user()) {
            Cache::flush();       
            $noteData = $request->all();
            $noteData['user_id'] = $user->id;
            $data = NotesData::createNewNote($noteData);
            return response()->json(['userData' => $data], 200);
        } else {
            return response()->json(['error' => 'unauthorised'], 220);
        }

    }

    public function getAllNotes()
    {   
        // Cache::flush();
        $user = Auth::user();
        $id = $user->id;
        $notes = Cache::remember($id, 5, function ()
        {
            return NotesData::where('user_id', Auth::user()->id)->get();
        });
        return response()->json($notes,200);
    }

    public function updateNote(Request $request)
    {
        Cache::flush();
        $newNotesData = $request->all();
        $id = $newNotesData['id'];
        $noteData = NotesData::where('id' , $id)->first(); 
        $noteData->title = $newNotesData['title'];
        $noteData->note = $newNotesData['note'];
        $noteData->reminder = $newNotesData['reminder'];
        $noteData->save();
    }
}
