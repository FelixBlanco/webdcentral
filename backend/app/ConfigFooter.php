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
    protected $table      = 'tb_config_footers';
    protected $primaryKey = 'idConfigFooter';


    protected $fillable = [
        'direccion',
        'nroContacto',
        'email' ];
}
