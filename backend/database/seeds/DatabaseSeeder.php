<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PerfilesSeeder::class);
        $this->call(SatateOrderSeeder::class);
        $this->call(SectionAppSeeder::class);
        $this->call(StatusReclamo::class);
        $this->call(StatusSistemaSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ProductosSeeder::class);
    }
}
