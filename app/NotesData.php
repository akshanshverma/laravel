<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class NotesData extends Model
{
    protected $fillable = [
        'user_id', 'title', 'note', 'reminder', 'color', 'pin', 'archive'
    ];


    // protected $with=['labels'];


    public function createNewNote($input)
    {
        return NotesData::create($input);
    }


    public function labels()
    {
        return $this->hasMany('App\LabelMap','note_id');
    }

}
