<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset = "UTF-8">
    <title>Bienvenida</title>
    <link rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity = "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin = "anonymous">
    <style>
        @font-face {
            font-family: 'OpenSans-Light';
            src: url({{asset('fonts/OpenSans-Light.ttf')}});
        }

        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: "OpenSans-Light";
        }

        .cuerpo {
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
        }

        .cuerpo-descripcion {
            font-size: 22px;
        }

        .cont{
            margin:auto;
            width: 700px;
        }
        .cont p{
            text-align: justify;
        }

        .cont ul{       
            margin-top: 5%;
        }
        .cont ul li{
            margin-left: 2%;
            display: inline-block;
        }        
    </style>
</head>

<body class = "cuerpo" style = "background-image: url( {{asset('img/cuerpo-email/FONDO.png')}} )">

    <div class="cont">  
        <h1>Te damos la bienvenida!</h1>
        <p style="font-size: 18px">         
            Por favor, das click en el siguiente link para activar la cuenta
            <a href="http://depocentral.dyndns.org:8753/api/v1/activarCuenta/jzxAUQQnU3TGdtxWAg3U4OnNwyMMKI">http://depocentral.dyndns.org:8753/api/v1/activarCuenta/jzxAUQQnU3TGdtxWAg3U4OnNwyMMKI</a>
        </p>

        <p style="font-size: 16px">
            Si deseas cancelar la suscripcion al nuestros Newsletter, puedes hacer click <a href="#">Aqui</a>. Recorda que dejaras de recibir recibir promociones y novedades.
        </p>

        <ul>
            <li><a href="#" target="_black">FACEBOOK</a></li>
            <li><a href="#" target="_black">TWITTER</a></li>
            <li><a href="#" target="_black">FACEBOOK</a></li>
            <li><a href="#" target="_black">INSTAGRAM</a></li>
        </ul>       
    </div>    

    <div class=" cuerpo" style = "background-image: url({{ asset('img/cuerpo-email/FOOTER.png') }}); height: 494px;"></div>
</body>
</html>