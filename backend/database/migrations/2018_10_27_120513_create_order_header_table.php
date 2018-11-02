<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderHeaderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_order_header', function (Blueprint $table) {
            $table->increments('idOrderHeader');
            $table->date('Fecha_Pedido')->nullable();
            $table->string('Numero_Pedido')->nullable();
            $table->string('Numero_EncabezadoVenta')->nullable();
            $table->string('Estado_Pedido')->nullable();
            $table->string('Domicilio_Entrega')->nullable();
            $table->string('Codigo_Postal')->nullable();
            $table->integer('fk_idStateOrder');
            $table->string('codeProdSys')->nullable();
            $table->string('comentaryClient')->nullable();
            $table->integer('fk_idUserDriver');
            $table->integer('fk_idUser');
            $table->integer('stars')->default(0);
            $table->integer('fk_idProducto')->unsigned()->nullable();
            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_header');
    }
}
