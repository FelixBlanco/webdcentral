<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReclamosYSugerencia extends Model {
    protected $table      = 'tb_reclamos_y_sugerencias';
    protected $primaryKey = 'idReclamosSugerencia';

    protected $fillable = [
        'titulo',
        'descripcion',
        'fk_idUser',
        'fk_idStatusReclamo',
    ];

    public function user() {
        return $this->belongsTo('App\User', 'fk_idUser');
    }

    public function status() {
        return $this->belongsTo('App\StatusReclamo', 'fk_idStatusReclamo');
    }


}
