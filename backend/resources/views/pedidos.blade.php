
<!DOCTYPE html>
<html lang = "en">
<head>
    <meta charset = "UTF-8">
    <title>Pedidos</title>
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
        :root {
         --main-lines-color: #80ced6;  /*  color de las lineas  */
         --tabla-text-color:  #66757F; /* color para las letras de la tabla*/
        }
        body {
            font-family: "OpenSans-Light";
            font-size: 15px;
        }
      
        .cabecera {
            height: 15vh;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            background-image: url({{ asset('img/pedidos/RESUMEN-PEDIDOS-HEADER.jpg') }});
                
        }
        .footer {
            width: 100%;
	        position: relative;
            padding-top: 15%;
	        bottom: 0;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%; 
            background-image: url({{ asset('img/pedidos/RESUMEN-PEDIDOS-FOOTER.jpg') }}); 
        }
        .cuerpo {
            padding-top:7%;
            padding-left:10%;
            padding-right: 10%;
        }
        .recibo {
            padding-bottom: 30px;
            color: #55ACEE;
                   
        }
        .comprador {
            padding-bottom: 10px;
            padding-top: 10px;
            border-bottom: var(--main-lines-color) solid 2px;
        }
        .fecha {
            padding : 10px 0px ;
        }
        .total{
            padding-top: 20px;
            padding-bottom: 50px;
        }
        table {
            width: 100%;
            border-top: var(--main-lines-color) solid 2px; 
        }
        table tr:nth-child(2n-1) td {
          background:  #d5f4e6;
        }
        th {
            border-bottom: var(--main-lines-color) solid 2px;
            text-align:center;
            height: 40px;
        }
        td {
            text-align:center;
            height: 50px;
            max-width: 100px;
            
        }
       
    </style>
</head>

<body >
<!--  cabecera  img  -->  
<div class = "col-md-12 cabecera " >

</div>
<div class = "container-fluid">
<!--  -----------  -->

<!-- cuerpo  -->
  <div class="cuerpo">
    <div class = "row justify-content-center " style=" " >
        <div class = "col-md-12 " >
            <div  class="" >
                <h3 class="recibo"><strong> RECIBO N°</strong></h3>
            </div>
        </div>
    </div>
    <div class = "row justify-content-center  comprador" >
        <div class = "col-sm-6 " >
            <div  >
                Nombre del Comprador:
                <br>
                <strong>Jose Jose</strong>
            </div>
        </div>
        <div class = "col-sm-6 " >
            <div style="" >
                  ID:
                <br>
                <strong>1231</strong>
            </div>
        </div>
    </div>
    <div class = "row justify-content-center fecha " >
        <div class = "col-md-12 " >
            <div  >
                Fecha:
                <br>
                <strong>fecha</strong>
            </div>
        </div>
        
    </div>
   <!--  Tabla de pedidos -->
    <div class = "row justify-content-center fecha "  >
        <table >
            <tr  >
                <th scope="col" ><strong>PRODUCTO</strong></th>
                <th scope="col" ><strong>DESCRIPCION</strong></th>
                <th scope="col" ><strong>CANTIDAD</strong></th>
                <th scope="col" ><strong>PRECIO</strong></th>
                <th scope="col" ><strong>TOTAL</strong></th>
            </tr>       

            <tr>
                <td>Royal Canin active</td>
                <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorealley  the printing and type</td>
                <td>1</td>
                <td>$ price</td>
                <td>$ total </td>
            </tr> 
            <tr>
                <td>Royal Canin active</td>
                <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorealley  the printing and type</td>
                <td>1</td>
                <td>$ price</td>
                <td>$ total </td>
            </tr>      
       
        </table>
       
    </div>
  
    <div class="row justify-content-end total">
                 <h3>TOTAL: <strong>total$</strong></h3>
    </div>
    


</div>
<!-- ---------  -->
<!-- footer img -->
    <div class = "row ">
        <div class = "col-md-12  footer " >

        </div>
    </div>
<!-- ---------  -->
</div>
</body>
</html>