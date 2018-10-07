<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ConfigHome;

class ConfigHomeController extends Controller
{
    public function getConfigHome(){
    	return ConfigHome::first(); 
    }

    public function upgradeConfigHome(Request $request){
    	dd($request->all()) ; 
    }

}
