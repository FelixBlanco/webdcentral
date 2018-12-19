<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PerfilCliente extends Model
{
    use SoftDeletes;

    protected $table = 'tb_perfil_clientes';

    protected $primaryKey = 'idPerfilCliente';

    protected $fillable = [
        'nombreComercio',
        'nombre',
        'apellido',
        'documento_dni',
        'documento_otro',
        'correo',
        'telefono',
        'celular',
        'fk_idPerfilCliente',

        'domicilio_entrega',
        'fk_idTipoFactura', //opcional
        'CUIT',             //opcional
        'CUITrazonSocial',  //opcional
        'CUITDomicilioFidcal', //opcional

        'domicilio_1',
        'domicilio_2',
        'domicilio_3',
        'domicilio_4',
        'domicilio_5',
        'domicilio_6',        
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'fk_idPerfilCliente');
    }
}
