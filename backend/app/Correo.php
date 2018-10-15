<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Correo extends Model {
    protected $table      = 'tb_correos';
    protected $primaryKey = 'idCorreo';

    protected $fillable = [
        'email',
        'password',
    ];

}
