<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Slide extends Model {

    use SoftDeletes;

    protected $table      = 'tb_slides';
    protected $primaryKey = 'idSlide';

    protected $fillable = [
        'titulo',
        'imagen',
        'fk_idProducto',
    ];

}
