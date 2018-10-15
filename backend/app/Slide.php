<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Slide extends Model {

    protected $table      = 'tb_slides';
    protected $primaryKey = 'idSlide';

    protected $fillable = [
        'titulo',
        'imagen',
        'fk_idProducto',
    ];

}
