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
            $table->date('Fecha_Pedido');
            $table->string('Numero_Pedido');
            $table->string('Numero_EncabezadoVenta');
            $table->string('Estado_Pedido');
            $table->string('Domicilio_Entrega');
            $table->string('Codigo_Postal');
            $table->integer('fk_idStateOrder');
            $table->string('codeProdSys');
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
        Schema::dropIfExists('order_header');
    }
}
