<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddImagenesToConfigFooter extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('tb_config_footers', function(Blueprint $table) {
            $table->string('img_envio_1')->nullable();
            $table->string('img_envio_2')->nullable();
            $table->string('img_envio_3')->nullable();
            $table->string('img_como_comprar')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('tb_config_footers', function(Blueprint $table) {
            $table->dropColumn('img_envio_1');
            $table->dropColumn('img_envio_2');
            $table->dropColumn('img_envio_3');
            $table->dropColumn('img_como_comprar');
        });
    }
}
