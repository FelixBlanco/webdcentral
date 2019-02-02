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
    </style>
</head>

<body class = "cuerpo" style = "background-image: url( {{asset('img/cuerpo-email/FONDO.png')}} )">
<div class = "container-fluid">

    <div class="row">
        <div class = "col-md-10">

            <div class = "titulo">
                <h2 class = "pb-5" style = "color:#E97604; "> Te damos la bienvenida! </h2>
            </div>
            <div class = "titulo">
                <h3 class = "pb-5" style = "color:#E97604; "> Por favor, faz click en el siguiente link para activar la cuenta"</h3>
            </div>
            <div class = "cuerpo-descripcion">
                http://depocentral.dyndns.org:8753/api/v1/activarCuenta/{{ $token }}
            </div>
        </div>

        <div class = "col-md-10">
            <div class="pb-5" style="color: #e97604;">
                <h5>
                    Si deseas cancelar la suscripcion al nuestros Newsletter, puedes hacer click <a href="http://depocentral.dyndns.org:8753/api/v1/cancelarSuscripcionTocken/{{ $sus->tocken }}">AQUI</a>. Recorda que dejaras de recibir recibir promociones y novedades.
                </h5>
            </div>

        </div>
    </div>
    {{-- <div class = "row">
        <div class = "col-md-12 cuerpo" style = "background-image: url({{ asset('img/cuerpo-email/HEADER.png') }}); height: 664px;">
            <h1>Hola Gracias por registrarte con nosotros</h1>
        </div>
    </div>


    <div class = "row justify-content-center" style = "padding-bottom: 2%">
        <div class = "col-md-10">
            <div class = "titulo">
                <h2 class = "pb-5" style = "color:#E97604; "> Sigue el link para activar la cuenta</h2>
            </div>
            <div class = "cuerpo-descripcion">
                http://depocentral.dyndns.org:8753/{{ $token }}
            </div>
        </div>
    </div>
     --}}

    <div class = "row">
        <div class = "col-md-12 cuerpo" style = "background-image: url({{ asset('img/cuerpo-email/FOOTER.png') }}); height: 494px;">

        </div>
    </div>

</div>
</body>
</html>