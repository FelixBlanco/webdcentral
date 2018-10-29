<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiciosWebsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_servicios_web', function (Blueprint $table) {
            $table->increments('idServicioWeb');
            $table->string('titulo');
            $table->string('descripcion');
            $table->string('foto');
            $table->string('fk_idStatus');
            $table->string('fk_idListaEmail');
            $table->string('fk_idListaTelefono');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_servicios_web');
    }
}
