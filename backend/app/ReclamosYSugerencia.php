<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReclamosYSugerencia extends Model {
    protected $table      = 'tb_reclamos_y_sugerencias';
    protected $primaryKey = 'idReclamosSugerencia';

    protected $fillable = [
        'titulo',
        'descripcion',
        'status',
        'fk_idUser',
    ];
}
