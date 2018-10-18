<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReclamosYSugerenciasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_reclamos_y_sugerencias', function (Blueprint $table) {
            $table->increments('idReclamosSugerencia');
            $table->string('titulo');
            $table->text('descripcion');
            $table->string('status');
            $table->integer('fk_idUser');
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
        Schema::dropIfExists('reclamos_y_sugerencias');
    }
}
