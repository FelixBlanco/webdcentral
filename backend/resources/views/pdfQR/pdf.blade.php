<!doctype html>
<html lang = "es">
<head>
    <!-- Required meta tags -->
    <meta charset = "utf-8">
    <meta name = "viewport" content = "width=device-width, initial-scale=1, shrink-to-fit=no">

    <style>

        @page {
            margin: 0cm 0cm;
        }

        body {
            margin-top: 5cm;
            margin-left: 10cm;
            margin-right: 10cm;
            margin-bottom: 2cm;
        }

        header {
            position: fixed;
            top: 0cm;
            left: 0cm;
            right: 0cm;
            height: 5cm;
        }

        footer {
            position: fixed;
            bottom: 0cm;
            left: 0cm;
            right: 0cm;
            height: 5cm;
        }

        h1 {
            padding: 2px;
            text-align: center;
        }

    </style>

    <!-- Bootstrap CSS -->
    <link rel = "stylesheet" href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity = "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin = "anonymous">

</head>

<body>

<header>
    <img src = {{asset("img/PLANTILLA-CODIGO-QR-HEADER.jpg")}} alt="" width = "100%" height = "100%">
</header>

<body>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<h1> MAQUINA {{$respuesta['nroMachine']}}</h1>
<br>
<br>
<div align = "center">
    <img src = "data:image/png;base64, {!! base64_encode(\SimpleSoftwareIO\QrCode\Facades\QrCode::format('png')->size(500)->generate($respuesta['token'])) !!} ">
</div>
</body>

<footer>
    <img src = {{asset("img/PLANTILLA-CODIGO-QR-FOOTER.jpg")}} alt="" width = "100%" height = "100%">
</footer>

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src = "https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity = "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin = "anonymous"></script>
<script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity = "sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin = "anonymous"></script>
<script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity = "sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin = "anonymous"></script>
</body>

</html>