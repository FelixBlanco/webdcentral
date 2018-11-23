
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class GlobalD {
    SERVER: any = 'http://127.0.0.1';
    HOST: any = '8000';
    API: any = this.SERVER + ':' + this.HOST;
}
