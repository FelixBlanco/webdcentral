<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Perfil extends Model {

    /**
     * The primary key for the model.
     *
     * @var string
     */
    use SoftDeletes;
    protected $table = 'tb_perfil';
    protected $primaryKey = 'idPerfil'; // or null

    protected $fillable = [
        'nombre',
        'descripcion',
    ];


    public function user()
    {
        return $this->hasOne('App\User','fk_idPerfil','idPerfil');
    }
}
