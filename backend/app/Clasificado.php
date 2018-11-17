<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clasificado extends Model
{
    protected $table = 'tb_clasificados';

    protected $primaryKey = 'idClasificado';

    protected $fillable = [
        'foto',
        'titulo',
        'fk_idUser',
        'fk_idStatusSistema',
    ];

    public function user() {
        return $this->belongsTo('App\User', 'fk_idUser');
    }

}
