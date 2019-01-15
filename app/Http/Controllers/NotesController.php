<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Facades\App\NotesData;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;
use App\NoteImage;

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
        Cache::flush();
        $user = Auth::user();
        $id = $user->id;
        $notes = Cache::remember($id, 5, function () {
            return NotesData::with('labels')->where('user_id', Auth::user()->id)->get();
            // return NotesData::with()
        });
        return response()->json($notes, 200);
    }

    public function updateNote(Request $request)
    {
        Cache::flush();
        $newNotesData = $request->all();
        $id = $newNotesData['id'];
        $noteData = NotesData::where('id', $id)->first();
        // if (!$noteData) {
        $noteData->title = $newNotesData['title'];
        $noteData->note = $newNotesData['note'];
        $noteData->reminder = $newNotesData['reminder'];
        $noteData->color = $newNotesData['color'];
        $noteData->pin = $newNotesData['pin'];
        $noteData->archive = $newNotesData['archive'];
        $noteData->trash = $newNotesData['trash'];
        $noteData->save();
        return response()->json('note update successfully', 200);
        // }
        // return response()->json('note not found',220);    
    }

    public function deleteNotes(Request $request)
    {
        Cache::flush();
        $note = NotesData::where('id', $request->id)->first();
        if (!$note) {
            return response()->json('no note found', 220);
        }
        $note->delete();
        return response()->json('note deleted', 200);
    }

    public function addImage(Request $request)
    {
        if ($request->hasFile('image')) {
            Cache::flush();
            $file = $request->file('image')->getRealPath();
            $imageData['image'] = 'data:image/jpg;base64,'.base64_encode(file_get_contents($file));
            $imageData['note_id'] = $request->get('note_id');
            $successData = NoteImage::create($imageData);
            return response()->json(['success' => $successData], 200);
        }
    }

    public function removeImageFromNote(Request $request)
    {
        Cache::flush();
        $id= $request->id;
        $image = NoteImage::where('id',$request->id)->first();
        if (!$image) {
            return response()->json('no image found', 220);
        }
        $image->delete();
        return response()->json('image deleted', 200);
    }
}
