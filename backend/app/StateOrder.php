<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StateOrder extends Model
{
    protected $table = 'tb_state_order';
    protected $primaryKey = 'idStateOrder';
    

    protected $fillable = [
        'StateOrder'
    ];
}
