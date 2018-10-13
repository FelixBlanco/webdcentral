<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GaleriaHome extends Model
{


    /**
     * The primary key for the model.
     *
     * @var string
     */

    protected $table = 'tb_galeria_home';

    protected $fillable = [
        'titulo'
    ];
}
