<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PerfilCliente extends Model {

    use SoftDeletes;
    protected $table      = 'tb_perfil_clientes';
    protected $primaryKey = 'idPerfilCliente';

    protected $fillable = [
        'nombreComercio',
        'nombre',
        'apellido',
        'documento',
        'correo',
        'telefono',
        'celular',
        'domicilioEntrega',
        'facturacion',
    ];

    public function user()
    {
        return $this->hasOne('App\User','fk_idPerfilCliente','tb_perfil_clientes');
    }

}
