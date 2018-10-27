<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class orderHeader extends Model
{
    //

    protected $table = 'tb_order_header';

    protected $primaryKey = 'idOrderHeader';

    protected $fillable = [
        'Fecha_Pedido',
        'Numero_Pedido',
        'Numero_EncabezadoVenta',
        'Estado_Pedido',
        'Domicilio_Entrega',
        'Codigo_Postal',
        'fk_idStateOrder',
        'codeProdSys',
        'fk_idUser',
    ];

    public function state()
    {
        return $this->belongsTo('App\StateOrder', 'fk_idStateOrder');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'fk_idUser');
    }
}
