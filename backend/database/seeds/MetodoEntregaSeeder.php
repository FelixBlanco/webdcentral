<?php

use Illuminate\Database\Seeder;

class MetodoEntregaSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        \App\metodoEntregaValues::created([ 'descripcion' => 'En tienda' ]);
        \App\metodoEntregaValues::created([ 'descripcion' => 'Delivery' ]);
        \App\metodoEntregaValues::created([ 'descripcion' => 'Interior' ]);
    }
}
