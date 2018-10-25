<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiciosWeb extends Model
{

    protected $table      = 'tb_servicios_web';
    protected $primaryKey = 'idServicioWeb';

    protected $fillable = [
        'titulo',
        'descripcion',
        'foto',
        'fk_idStatus',
        'fk_idListaEmail',
        'fk_idListaTelefono',
    ];
}
