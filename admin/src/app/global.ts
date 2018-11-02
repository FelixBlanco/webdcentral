import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class GlobalD {
    SERVER: any = 'http://localhost';
    HOST: any = '8000';
    API: any = this.SERVER + ':' + this.HOST;
}