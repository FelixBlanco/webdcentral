<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promocion extends Model
{
    protected $table      = 'tb_promociones';
    protected $primaryKey = 'idPromo';

    protected $fillable = [
        'nombre',
        'titulo',
        'urlImage',
        'promocion',
        'categoria',
        'fk_listaPesos',
    ];
}
