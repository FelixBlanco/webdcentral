<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PreguntasFrecuente extends Model
{

    protected $table      = 'tb_preguntas_frecuentes';
    protected $primaryKey = 'idPreguntaFrecuente';

    protected $fillable = [
        'pregunta',
        'respuesta',
        'fk_idUser',
    ];


    public function user()
    {
        return $this->belongsTo('App\User', 'fk_idUser');
    }

}
