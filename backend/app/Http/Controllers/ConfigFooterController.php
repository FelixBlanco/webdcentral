<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ConfigFooter;

class ConfigFooterController extends Controller
{
    public function getInfo(){
    	return ConfigFooter::first();
    }

    public function updateInfo(Request $request){

    	// Como se supone que estamos editanto,
    	// vamos a dejar el unico registro 
    	// para editar

    	$d = ConfigFooter::first();
    	
    	if (empty($d)) { // Caso de estar vacio
    		$c = new ConfigFooter($request->all());
    		$c->save();
    	}else{
	    	$d->direccion = $request->direccion;
	    	$d->nroContacto = $request->nroContacto;
	    	$d->email = $request->email; 
		    $d->save();
    	}
    
    }
}
