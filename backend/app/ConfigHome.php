<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConfigHome extends Model
{


    /**
     * The primary key for the model.
     *
     * @var string
     */


    protected $table = 'tb_config_homes';
    protected $fillable = ['color','logo'];
}
