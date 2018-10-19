<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConfigFooter extends Model {

    /**
     * The primary key for the model.
     *
     * @var string
     */

    protected $table      = 'tb_config_footers';
    protected $primaryKey = 'idConfigFooter';


    protected $fillable = [
        'direccion',
        'nroContacto',
        'email' ];
}
