<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class GaleriaHome extends Model
{
    protected $table = 'tb_galeria_home';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'titulo'
    ];

}
