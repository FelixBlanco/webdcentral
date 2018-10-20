<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Color extends Model {
    protected $table      = 'tb_colores';
    protected $primaryKey = 'idColor';


    protected $fillable = [
        'colorOscuro',
        'colorMedio',
        'colorClaro',
    ];
}
