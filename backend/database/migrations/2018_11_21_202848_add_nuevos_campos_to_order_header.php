<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNuevosCamposToOrderHeader extends Migration
{
    public function up()
    {
        /*Schema::table('tb_order_header', function (Blueprint $table) {
            $table->integer('listaPrecio')->nullable()->after('avenidas');
        });*/
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       /* Schema::table('tb_order_header', function (Blueprint $table) {
            $table->dropColumn('listaPrecio');
        });*/
    }
}
