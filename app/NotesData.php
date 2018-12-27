<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class NotesData extends Model
{
    protected $fillable = [
        'user_id', 'title', 'note', 'reminder', 'color', 'pin', 'archive'
    ];


    public function createNewNote($input)
    {
        return NotesData::create($input);
    }
}
