<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFotoPerfilUsers extends Migration
{
    public function up()
    {
        Schema::table('tb_users', function (Blueprint $table) {
            $table->string('foto_perfil')->nullable();
        });
    }

    public function down()
    {
        Schema::table('tb_users', function (Blueprint $table) {
            $table->dropColumn('foto_perfil');
        });
    }

}
