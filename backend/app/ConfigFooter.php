<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConfigFooter extends Model
{
	protected $table = 'tb_config_footers';
	
    protected $fillable = ['direccion','nro_contacto','email'];
}
