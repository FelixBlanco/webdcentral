<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPerfilClienteDomicilioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tb_perfil_clientes', function (Blueprint $table) {
            $table->string('domicilio_1'); // Solo este es requerido
            $table->string('domicilio_2')->nullable();
            $table->string('domicilio_3')->nullable();
            $table->string('domicilio_4')->nullable();
            $table->string('domicilio_5')->nullable();
            $table->string('domicilio_6')->nullable();            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tb_perfil_clientes', function (Blueprint $table) {
            //
        });
    }
}
