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

        // Paginas
        DB::table('tb_secciones_paginas')->insert([
            'nombre' => 'inicio',
            'link' => '/inicio',
        ]);

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

        // Modals
        DB::table('tb_secciones_paginas')->insert([
            'nombre' => 'Mascotas',
            'link' => 'null',
            'modal' => '#mascotasModal',
        ]);   

        DB::table('tb_secciones_paginas')->insert([
            'nombre' => 'Marca',
            'link' => 'null',
            'modal' => '#marcaModal',
        ]);   

        DB::table('tb_secciones_paginas')->insert([ // eso esta en servicio hasta los momentos
            'nombre' => 'Servicios',
            'link' => 'null',
            'modal' => '#serviciosConstruccionModal',
        ]);   

        DB::table('tb_secciones_paginas')->insert([
            'nombre' => 'Contactanos',
            'link' => 'null',
            'modal' => '#contactanosModal',
        ]);                                   
    }
}
