<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PesoProducto extends Model {
    protected $table      = 'tb_pesos_productos';
    protected $primaryKey = 'idPesoProducto';

    protected $fillable = [
        'peso',
        'fk_idProducto',
    ];
}
