<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Destacado extends Model
{
    protected $table = 'tb_destacados';
    protected $primaryKey = 'id_Destacado';

    protected $fillable = [
        'descripcion',
        'fk_idProducto',
    ];

    public function producto()
    {
        return $this->belongsTo('App\Producto', 'fk_idProducto');
    }
}
