<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SectionApp extends Model
{
    protected $table = 'tb_secctionapp';
    protected $primaryKey = 'idSecctionApp';

    protected $fillable = [
        'tag'
    ];
}
