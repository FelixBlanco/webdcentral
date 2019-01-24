<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeccionesPaginaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	/* los links son tomados desde las rutas del angular */
        DB::table('tb_secciones_paginas')->insert([
        	'nombre' => 'ofertas',
        	'link' => '/ofertas',
        ]);

        DB::table('tb_secciones_paginas')->insert([
        	'nombre' => 'envios',
        	'link' => '/envios',
        ]); 
        
        DB::table('tb_secciones_paginas')->insert([
        	'nombre' => 'blog',
        	'link' => '/blog',
        ]);                
    }
}
