<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class NotesData extends Model
{
    protected $fillable = [
        'user_id', 'title', 'note', 'reminder', 'color', 'pin', 'archive'
    ];


    protected $with=['images'];


    public function createNewNote($input)
    {
        return NotesData::create($input);
    }


    public function labels()
    {
        return $this->hasMany('App\LabelMap','note_id');
    }
    
    public function images()
    {
        return $this->hasMany('App\NoteImage','note_id');
    }

}
