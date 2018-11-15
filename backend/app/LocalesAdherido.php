<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LocalesAdherido extends Model {
    use SoftDeletes;
    protected $table      = 'tb_locales_adheridos';
    protected $primaryKey = 'idLocalAdherido';

    protected $fillable = [
        'fk_idClasificado',
        'nombre',
        'descripción',
        'foto_1',
        'foto_2',
        'fk_idUser',
    ];

}
