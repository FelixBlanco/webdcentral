<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNuevosCamposToOrderHeader extends Migration {
    public function up() {
        Schema::table('tb_order_header', function(Blueprint $table) {
            $table->string('metodoEntrega')->nullable();
            $table->string('disponibilidadHr')->nullable();
            $table->string('CUIT')->nullable();
            $table->string('CUITrazonSocial')->nullable();
            $table->string('CUITDomicilioFidcal')->nullable();
            $table->string('metodoPago')->nullable();
            $table->string('comprobanteDepositoTransferencia')->nullable();
            $table->string('fk_idTipoFactura')->nullable();
            $table->string('localidad')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('tb_order_header', function(Blueprint $table) {
            $table->dropColumn('metodoEntrega');
            $table->dropColumn('disponibilidadHr');
            $table->dropColumn('CUIT');
            $table->dropColumn('CUITrazonSocial');
            $table->dropColumn('CUITDomicilioFidcal');
            $table->dropColumn('metodoPago');
            $table->dropColumn('comprobanteDepositoTransferencia');
            $table->dropColumn('fk_idTipoFactura');
            $table->dropColumn('localidad');
        });
    }
}
