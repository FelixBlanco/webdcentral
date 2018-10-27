<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderBodyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_order_body', function (Blueprint $table) {
            $table->increments('idOrderBody');
            $table->integer('fk_idOrderHeader');
            $table->string('codeProdSys');
            $table->string('Cantidad_Producto');
            $table->string('PrecioUnitario_Producto');
            $table->string('PorcentajeDescuento_Producto');
            $table->string('Devolucion_Producto');
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
        Schema::dropIfExists('order_body');
    }
}
