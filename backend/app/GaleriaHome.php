<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GaleriaHome extends Model
{
    protected $table = 'tb_galeria_home';
    protected $primaryKey = 'idGaleriaHome';

    protected $fillable = [
        'titulo'
    ];
}
