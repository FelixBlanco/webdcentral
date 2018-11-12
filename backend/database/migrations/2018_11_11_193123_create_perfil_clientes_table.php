<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePerfilClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_perfil_clientes', function (Blueprint $table) {
            $table->increments('idPerfilCliente');
            $table->string('nombreComercio');
            $table->string('nombre');
            $table->string('apellido');
            $table->string('documento');
            $table->string('correo');
            $table->string('telefono');
            $table->string('celular');
            $table->string('domicilioEntrega');
            $table->string('facturacion');
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
        Schema::dropIfExists('tb_perfil_clientes');
    }
}
