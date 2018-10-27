<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model {

    protected $table      = 'tb_productos';
    protected $primaryKey = 'idProducto';

    protected $fillable = [
        'nombre',
        'titulo',
        'urlImage',
        'promocion',
        'categoria',
        'fk_idSatate',
        'isOutstanding',
        'fechaIsOutstanding',
    ];
}
