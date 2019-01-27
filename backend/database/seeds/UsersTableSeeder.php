<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        // Usuario por defecto 
        DB::table('tb_users')->insert([
            'name'        => 'Admin Web Central',
            'userName'    => 'AdminWebcentral',
            'password'    => '$2y$12$73xeeVbFGvJHQjG6HcdQJ.OqjbaoX6NJlsdfLyPh3A7PbvC0PO7nW', // 12345
            'email'       => 'admin@example.org',
            'fk_idPerfil' => '1',
            'statusUser'  => '1',
        ]);

        DB::table('tb_perfil_clientes')->insert([ 'fk_idPerfilCliente' => 1 ]);
    }
}
