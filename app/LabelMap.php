<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LabelMap extends Model
{
    protected $fillable = [
        'label_id', 'note_id'
    ];
}
