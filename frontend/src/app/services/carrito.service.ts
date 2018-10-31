import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CarritoService {

    carritoSource: BehaviorSubject<any[]> = new BehaviorSubject([]);
    carritoItems: Observable<any[]> = this.carritoSource.asObservable();

    productListTemp = [
        {
            id: 1,
            producto: "Royal Canin ACTIVE1",
            descripcion: "Lorem ipsum dolor sit amet consecur sit descur adisping elt",
            precio: 185.50,
            cantidad: 1
        },
        {
            id: 2,
            producto: "Royal Canin ACTIVE2",
            descripcion: "Lorem ipsum dolor sit amet consecur sit descur adisping elt",
            precio: 185.50,
            cantidad: 1
        },
        {
            id: 3,
            producto: "Royal Canin ACTIVE3",
            descripcion: "Lorem ipsum dolor sit amet consecur sit descur adisping elt",
            precio: 185.50,
            cantidad: 1
        },
        {
            id: 4,
            producto: "Royal Canin ACTIVE4",
            descripcion: "Lorem ipsum dolor sit amet consecur sit descur adisping elt",
            precio: 185.50,
            cantidad: 1
        },
        {
            id: 5,
            producto: "Royal Canin ACTIVE5",
            descripcion: "Lorem ipsum dolor sit amet consecur sit descur adisping elt",
            precio: 185.50,
            cantidad: 1
        }
    ]


    constructor(){
        this.carritoSource.next(this.productListTemp);
    }


    addItem(item: any) : void{
        this.carritoSource.next(item);
    }

    removeItem(item: any): void{
        const items: any = this.carritoSource.getValue();
        console.log('items-remove',items);
    }

    incraseOrDecraseItem(idItem: number, action: boolean){
        let items: any[] = this.carritoSource.getValue();

        items.forEach((el) => {
            if(el.id === idItem){
                if(action)
                    el.cantidad++
                else
                    if(el.cantidad > 1)
                        el.cantidad--
            }
        });

        this.carritoSource.next(items);

    }
}