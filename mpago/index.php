<?php
require_once __DIR__ .'/vendor/mercadopago/sdk/lib/mercadopago.php';
date_default_timezone_set("America/Argentina/Buenos_Aires");
header("Access-Control-Allow-Origin: *");


//Receive the RAW post data.
$content = file_get_contents('php://input');
$json = json_decode($content);



$mp = new MP($json->{"clienteid"}, $json->{"clientesecret"});


$preference_data = array(
	"items" => array(
		array(
			"title" => $json->{"title"},
			"quantity" => 1,
			"currency_id" => $json->{"currency_id"},
			"unit_price" => $json->{"unit_price"}
		
		)
		),
	"external_reference" => date('Ymd-His')
);



$preference = $mp->create_preference($preference_data);

if($preference != null){
	$URL =  $preference['response']['init_point'];
	header('Content-type: application/json; charset=utf-8');

		// GUARDAMOS LA INFO // 

		$uri = $json->{"uri"};
		$param = array(
			"mp_jsonPaymentCard" => json_encode($preference),
			"id" => $json->{"id"}
		);

		$headers = array
		(
			'Content-Type: application/json'
		);

		$ch = curl_init();
		curl_setopt( $ch,CURLOPT_URL, $uri );
		curl_setopt( $ch,CURLOPT_POST, true );
		curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
		curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $param ) );
		$result = curl_exec($ch );
		curl_close( $ch );


		
		echo json_encode($URL);
	exit();
}





   
?>

