<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class orderBody extends Model
{
    protected $table = 'tb_order_body';

    protected $primaryKey = 'idOrderBody';

    protected $fillable = [
        'fk_idOrderHeader',
        'codeProdSys',
        'Cantidad_Producto',
        'PrecioUnitario_Producto',
        'PorcentajeDescuento_Producto',
        'Devolucion_Producto'
    ];

   

    public function orderHeader()
    {
        return $this->belongsTo('App\orderHeader', 'fk_idOrderHeader');
    }
}
