<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StatusSistema extends Model {
    protected $table      = 'tb_status_sistemas';
    protected $primaryKey = 'idStatusSistema';

    protected $fillable = [
        'descripcion',
    ];

}
