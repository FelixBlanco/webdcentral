<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Oferta extends Model {
    protected $table      = 'tb_ofertas';
    protected $primaryKey = 'idOferta';

    protected $fillable = [
        'titulo',
        'tiempoExpi',
        'imagen',
        'status',
    ];
}
