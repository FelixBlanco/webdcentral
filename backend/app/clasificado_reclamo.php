<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class clasificado_reclamo extends Model
{
    protected $table = 'tb_clasificado_reclamos';

    protected $primaryKey = 'idClasificadoReclamo';

    protected $fillable = [
        'nombre',
        'status',
    ];

}
