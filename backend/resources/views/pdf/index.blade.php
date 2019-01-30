<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset = "UTF-8">
    <title>Activar cuenta</title>

    <style>

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
            <div class = "cuerpo-descripcion">
                {{ $title }}
            </div>
        </div>
    </div>
    <div class = "row">
        <div class = "col-md-12 cuerpo" style = "background-image: url({{ asset('img/cuerpo-email/FOOTER.png') }}); height: 494px;">

        </div>
    </div>

</div>
</body>
</html>