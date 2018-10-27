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
            $table->string('codeProdSys');
            $table->string('kiloProdcuto');
            $table->string('SubRubro1');
            $table->string('SubRubro2');
            $table->string('precioL1');
            $table->string('precioL2');
            $table->string('precioL3');
            $table->string('precioL4');
            $table->string('precioL5');
            $table->string('precioL6');
            $table->string('precioL7');
            $table->string('precioL8');
            $table->string('precioL9');
            $table->string('rubro');
            $table->string('marca');
            $table->integer('fk_idSatate')->unsigned();
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
