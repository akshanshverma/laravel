<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NoteImage extends Model
{
    protected $fillable = [
        'note_id', 'image'
    ];
    protected $table = 'note_image';
}
