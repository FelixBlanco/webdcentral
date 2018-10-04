{!! Form::open(['route'=>['pdf'],'method'=>'POST']) !!}

    <label for = "nroMachine">nroMachine</label>
    <input name="nroMachine" type="text" name="nroMachine" id="nroMachine"></input>

    <label for = "token">Token</label>
    <input name="token" type="text" name="nroMachine" id="token" value="{{csrf_token()}}"> </input>

    <button type="submit">Enviar</button>

{!! Form::close() !!}