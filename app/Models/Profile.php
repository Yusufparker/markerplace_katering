<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'description',
        'contact',
        'location'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}