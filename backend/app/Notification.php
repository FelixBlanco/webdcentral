<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $table = 'tb_notification';
    protected $primaryKey = 'idNotification';

    protected $fillable = [
        'titleNotification',
        'descriptionNotification',
        'fk_idSecctionApp'
    ];
}
