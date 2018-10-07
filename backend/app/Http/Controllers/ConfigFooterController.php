<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ConfigFooter;

class ConfigFooterController extends Controller
{
    public function getInfo(){
    	return ConfigFooter::find(1);
    }

    public function updateInfo(Request $request){

    	// Como se supone que estamos editanto,
    	// vamos a dejar el unico registro 
    	// para editar

    	$d = ConfigFooter::find(1);
    	
    	if (empty($d)) { // Caso de estar vacio
    		$c = new ConfigFooter($request->all());
    		$c->save();
    	}else{
	    	$d->direccion = $request->direccion;
	    	$d->nro_contacto = $request->nro_contacto;
	    	$d->email = $request->email; 
		    $d->save();
    	}
    
    }
}
