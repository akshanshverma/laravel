<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Facades\App\NotesData;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Auth;
use JD\Cloudder\Facades\Cloudder;
use App\NoteImage;
use App\note_drag;

class NotesController extends Controller
{
    /**
     * create note is a function to create new note in the app
     * 
     * @var Request 
     * @return json
     */
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

    /**
     * get all note is a function to fatch note from data base 
     * 
     * @return json note data 
     */
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

    /**
     * update note is function which update tha data of note in the data base
     * 
     * @var Request 
     * @return json
     */
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

    /**
     * delete note function delete a note from data base
     * 
     * @var Request 
     * @return json
     */
    public function deleteNotes(Request $request)
    {
        Cache::flush();
        $note = NotesData::where('id', $request->id)->first();
        if (!$note) {
            return response()->json('no note found', 220);
        }
        $deletedIndex = $note->note_index;
        $note->delete();
        $allNote = NotesData::where('user_id', Auth::user()->id)->get();
        foreach ($allNote as $noteData) {
            if ($noteData->note_index > $deletedIndex) {
                $noteData->note_index = $noteData['note_index'] - 1;
                $noteData->save();
            }
        }
        return response()->json('note deleted', 200);
    }

    /**
     * add image function add image on image data base ane make relation with note 
     * 
     * @var Request 
     * @return json
     */
    public function addImage(Request $request)
    {
        if ($request->hasFile('image')) {
            Cache::flush();
            $file = $request->file('image')->getRealPath();
           
            // dd(env('CLOUDINARY_API_KEY'));
            $url = Cloudder::upload($file, null)->getResult()['url'];
            $imageData['image'] = $url;
            $imageData['note_id'] = $request->get('note_id');    
            $successData = NoteImage::create($imageData);
            return response()->json(['success' => $successData], 200);
        }
    }

    /**
     * remove image function remove image from note 
     * 
     * @var Request 
     * @return json
     */
    public function removeImageFromNote(Request $request)
    {
        Cache::flush();
        $id = $request->id;
        $image = NoteImage::where('id', $request->id)->first();
        if (!$image) {
            return response()->json('no image found', 220);
        }
        $image->delete();
        return response()->json('image deleted', 200);
    }

    public function changeIndex(Request $request)
    {
        $indexData = $request->all();
        $noten = NotesData::where('user_id', Auth::user()->id)->get();

        if ($indexData['dropIndex'] < $indexData['noteIndex']) {
            foreach ($noten as $note) {
                if ($note['note_index'] >= $indexData['dropIndex'] && $note['note_index'] < $indexData['note_index']) {
                    $note->note_index = $note['note_index'] + 1;
                    $note->save();
                }
            }
        }
    }
}
