<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConfigHome extends Model
{
    protected $table = 'tb_config_homes';
    protected $fillable = ['color','logo'];
}
