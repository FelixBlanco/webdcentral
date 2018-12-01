<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConfigFooter extends Model {
    /**
     * The primary key for the model.
     *
     * @var string
     */
    use SoftDeletes;

    protected $table = 'tb_config_footers';

    protected $primaryKey = 'idConfigFooter';

    protected $fillable = [
        'direccion',
        'nroContacto',
        'mail1',
        'mail2',
        'latitud',
        'longitud',
        'whatsApp1',
        'whatsApp2',
        'horarios',
        'subtes',
        'colectivos',
        'avenidas',
        'listaPrecio',
        'desde',
        'hasta',
        'url_mercado_libre',
    ];

}
