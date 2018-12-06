import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEwOGY3ZGZhZjkwNDdkYzZlZjNmNmRlNWExMDFiMjZhMWZkNTY4ZjA3N2I2NDJmMmUwOGQyYmFiOWRmMzdkZmVlMjdhODBlNmJmODY5MWM2In0.eyJhdWQiOiIzIiwianRpIjoiMTA4ZjdkZmFmOTA0N2RjNmVmM2Y2ZGU1YTEwMWIyNmExZmQ1NjhmMDc3YjY0MmYyZTA4ZDJiYWI5ZGYzN2RmZWUyN2E4MGU2YmY4NjkxYzYiLCJpYXQiOjE1NDQwNjI4MTAsIm5iZiI6MTU0NDA2MjgxMCwiZXhwIjoxNTc1NTk4ODA5LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.ro081GzjMVl15ZPBEEglMMpHmmix_vIu85-FWxYksfGH8xXnP4XDxogB3HQXplb0udHPhJcmVFWrO8EzBuVH6VwzQzzLZpPrZEPeuAQ1iZBVZRy4OS24YI3_WMFwkd6k6t3oBmqkxTGyc1kSnYVgDxpqURleQdcGxd996EUs7GeoxIB24pWvHBRXIu501B_UWgh-q8qyFvCrAO6s9qy-FXG3SykJVY1Y_A-KZTOBXZrOQjgistbhaeZBhVbrx92lfr6H3fBTgsILywUrnLRklgVqrqYPQtvliIkU_c0POmsu3X0PmP2I_6M7UZmGuBgC8xPvNekIYRHocD7VnCyQfWsbeiWvIBcasMIl5qVSCLhZPQKCHZZO-lLVpEpRxPlZKtQ6P7I1tioyYVjKr137kwpJiRGN6sgnlCrXzB639kWZi58oEMQBDIqTiSQdCKuPKV0AmEla1-9vw1l9AcSz-V8IhcFWOkobMFT_eNCJXBSI98FyLOyJaIoNlH1PakX4KOhX4Mb8EsTw1oOFbd3Nlqbl6M68_6Ao2F6YknpzsMIFy7iCjbFo5yuCdrIMv5DvXRaxBD9Vj8tKIOIkVPYtT4G1EMB5pjJwYhukA222P-6ozHOC2Qs7h1pDeXRjfncFiEs_KU1Ds8hf3zWT2fL9onH1QJsPIFSPDRBPTfzu1LQ'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClasificadoReclamoService {

  constructor(
    private http: HttpClient,   
  ) { }

  // Obtener todos los  Clasificados de reclamos
  _getClasificadosReclamos(data:any){
    return this.http.get(environment.apiHost + '/api/auth/listarClasificadoReclamo',httpOptions);
  }
  //agregragar clasificados de reclamos
  _addClasificadosReclamos(data:any){
    return this.http.post(environment.apiHost + '/api/auth/addClasificadoReclamo',data,httpOptions);
  }  
  // eliminar clasificados de reclamos
  _deleteClasificadosReclamos(id:number){
    return this.http.delete(environment.apiHost + '/api/auth/borrarClasificadoReclamo/'+id,httpOptions);
  }
}
