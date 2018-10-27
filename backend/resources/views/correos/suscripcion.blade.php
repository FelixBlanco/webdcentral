<!doctype html>
<html lang = "es">
<head>
    <meta charset = "UTF-8">
    <meta name = "viewport" content = "width=device-width, user-scalable=no, initial-scale=1.0">
    <title>Gracias por Suscribirse</title>
</head>
<body>
<p>Hola! {{$user->userName}} Se ha suscrito correctamente.</p>

<p>Desactiva suscrión</p>

<p> Recuerde usar su correo y nueva clave para acceder al sistema</p>

{{-- <p>Por favor siga el siguiente enlace para acceder al sistema {{url('/api/v1/setClave/'.$user->api_token)}}</p>--}} {{--Aun no se que ruta debo colocar para presentar la vista --}}
</body>
</html>