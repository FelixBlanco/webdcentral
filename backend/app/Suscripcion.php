<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Suscripcion extends Model
{

    protected $table      = 'tb_suscripcions';
    protected $primaryKey = 'idSuscripcion';

    protected $fillable = [
        'email',
        'motivoDeCancelacion',
        'fk_idStatusSistema',
    ];
}
