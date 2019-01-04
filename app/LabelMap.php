<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LabelMap extends Model
{

    protected $table = 'labelmap';
    protected $fillable = [
        'label_id', 'note_id'
    ];

    protected $with=['label'];
    public function label()
    {
        return $this->belongsTo('App\Labels','label_id');
    }
}
