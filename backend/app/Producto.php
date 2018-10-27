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
        'codeProdSys',
        'kiloProdcuto',
        'rubro',
        'marca',
        'SubRubro1',
        'SubRubro2',
        'precioL1',
        'precioL2',
        'precioL3',
        'precioL4',
        'precioL5',
        'precioL6',
        'precioL7',
        'precioL8',
        'precioL9'

    ];
}
