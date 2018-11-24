<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class turno extends Model
{
    use SoftDeletes;
    protected $table = 'tb_turnos';

    protected $primaryKey = 'idTurnos';

    protected $fillable = [
        'fk_idClasificado',
        'fk_idLocalAdherido',
        'fechaHora',
        'status',
        'fk_idUser',
    ];

    public function productos()
    {
        return $this->hasMany('App\Prducto', 'fk_idProducto','idCarrito');
    }

}
