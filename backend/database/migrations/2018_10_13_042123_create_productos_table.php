<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_productos', function (Blueprint $table) {
            $table->increments('idProducto');
            $table->string('nombre');
            $table->string('titulo');
            $table->string('urlImage');
            $table->string('promocion');
            $table->string('categoria');
            $table->integer('fk_idPesoProducto')->unsigned();

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
        Schema::dropIfExists('tb_productos');
    }
}
