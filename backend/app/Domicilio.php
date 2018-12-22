<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Domicilio extends Model {

    use SoftDeletes;
    protected $table      = 'tb_domicilios';
    protected $primaryKey = 'idDomicilios';

    protected $fillable = [
        'descripcion',
        'fk_idPerfilCliente',
    ];

    public function perfilCliente() {
        return $this->belongsTo('App\PerfilCliente', 'fk_idPerfilCliente');
    }
}
