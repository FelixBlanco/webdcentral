<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Suscripcion extends Model
{
    use SoftDeletes;

    protected $table      = 'tb_suscripcions';
    protected $primaryKey = 'idSuscripcion';

    protected $fillable = [
        'email',
        'motivoDeCancelacion',
        'fk_idStatusSistema',
    ];

    public function estatusSitema()
    {
        return $this->belongsTo('App\StatusSistema', 'fk_idStatusSistema');
    }
}
