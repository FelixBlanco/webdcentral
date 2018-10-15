<!doctype html>
<html lang = "es">
<head>
    <meta charset = "UTF-8">
    <meta name = "viewport" content = "width=device-width, user-scalable=no, initial-scale=1.0">
    <title>Correo de Prueba</title>
</head>
<body>
<p>Hola! Se ha registrado su nuevo usuario a las {{ $user->created_at }}.</p>
<p>Estos son los datos</p>
<ul>
    <li>Nombre: {{ $user->name }}</li>
    <li>Correo: {{ $user->email }}</li>
    <li>UserName: {{ $user->userName }}</li>
    <li>Clave actual: {{ $clave }}</li>
</ul>
<p>Rol del Usuario:</p>
<ul>
    <li>Rol: {{ $user->perfil->nombre }}</li>
</ul>
<p>Por favor siga el siguiente enlace para proceder al cambio de su contraseña {{url('/api/v1/setClave/'.$user->api_token)}}</p>
</body>
</html>