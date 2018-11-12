import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './productos.service';

@Injectable({providedIn: 'root'})
export class ProductsBehaviorService {

    
    productsSource: BehaviorSubject<Producto[]> = new BehaviorSubject([]);
    productsItems: Observable<Producto[]> = this.productsSource.asObservable();

    updateSource(products: Producto[]): void{
        this.productsSource.next(products);
    }

    getAllTheSourceValue(): Producto[]{
        return this.productsSource.value;
    }
}