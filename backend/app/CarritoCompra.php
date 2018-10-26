<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarritoCompra extends Model
{
    protected $table = 'tb_carrito_compras';

    protected $primaryKey = 'idCarrito';

    protected $fillable = [
        'producto',
        'descripcion',
        'precio',
        'cantidad',
        'total',
        'fk_idUser',
    ];

    public function cliente()
    {
        return $this->belongsTo('App\User', 'fk_idUser');
    }
}
