<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\ConfigHome;

class ConfigHomeController extends Controller
{
    public function getConfigHome(){
	   	$c =  ConfigHome::first();
        if (!empty($c)) {
            $c->set_logo = asset('storage/'.$c->logo); // Rutal del logo
        }
	   	return $c;
    }

    public function upgradeConfigHome(Request $request){

    	// Buscamos si hay registro 
    	$c_h = ConfigHome::first();
    	
		$file = $request->logo->getClientOriginalName(); // Nombre 
    	$name = $request->logo->store('config-home'); // Guardamos la imagen
    	//return $name;

    	if (empty($c_h)) { // Nuevo registro

    		$c_h = new ConfigHome($request->all());
    		$c_h->logo = $name;

    	}else{ // Editamos

    		$c_h->fill([
    			'logo' => $name,
    			'color' => $request->color,
    		]);

    	}

    	$c_h->save();

    	return $c_h;

    }	
}
