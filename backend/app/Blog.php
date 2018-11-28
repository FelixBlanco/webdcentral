<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use SoftDeletes;
    protected $table = 'tb_blogs';

    protected $primaryKey = 'idBlog';

    protected $fillable = [
        'fk_idusuario',
        'titulo',
        'foto',
        'descripción',
        'fk_idCategoría',
    ];

    public function categoriaBlog()
    {
        return $this->belongsTo('App\BlogCategoria', 'fk_idCategoría');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'fk_idusuario');
    }
}
