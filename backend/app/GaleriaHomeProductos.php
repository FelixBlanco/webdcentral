<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GaleriaHomeProductos extends Model {

    use SoftDeletes;
    protected $table      = 'tb_galeria_home_productos';
    protected $primaryKey = 'idGaleriaHomeProducto';

    protected $fillable = [
        'titulo',
        'imagen',
        'fk_idStatusSistema',
    ];

    public function statu()
    {
        return $this->belongsTo('App\StatusSistema', 'fk_idStatusSistema');
    }

}
