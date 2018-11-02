import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Item{
    id: number | string;
    producto: string;
    descripcion: string;
    precio: number;
    cantidad: number;
}

@Injectable()
export class CarritoService {

    carritoSource: BehaviorSubject<Item[]> = new BehaviorSubject([]);
    carritoItems: Observable<Item[]> = this.carritoSource.asObservable();

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
            descripcion: "Lorem ipsum dolor sit amet consecur sit descur adisping elt Lorem ipsum dolor sit amet consecur sit descur adisping elt Lorem ipsum dolor sit amet consecur sit descur adisping elt",
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

    /**
     * Agrega items a la tabla del carrito de compras
     * el siguiente registro debe contar con los siguientes parámetros
     * OBLIGATORIOS
     * 
     * @param id clave/serial/id del producto
     * @param producto nombre breve
     * @param descripcion descripción breve
     * @param cantidad la cantidad bruta de los productos sin decimales en unidades
     * @param precio denominado en ARS con decimales
     */
    addItem(id, producto, descripcion, cantidad, precio): Item{
        let items: Item[] = this.carritoSource.getValue();

        if(!id || !producto || !descripcion || !cantidad || !precio){
            debugger;
            throw new Error(`${ 
                !id ? 'id' : !producto ? 'producto': !descripcion ? 'descripion':  !cantidad ? 'cantidad': !precio ? 'precio': ''
            } <= es indefinido o null`);
        }

        const added: Item = {
            id : id,
            producto : producto,
            descripcion : descripcion,
            precio: precio,
            cantidad: cantidad
        }

        items.push(added);

        this.carritoSource.next(items);

        return added;
    }

    removeItem(id: number | string): void{
        const items: Item[] = this.carritoSource.getValue();

        items.forEach( (val,index) => {
            if(val.id === id){
                items.splice(index,1)
            }
        })

        this.carritoSource.next(items);
        
    }

    incraseOrDecraseItem(id: number | string, action: boolean){
        let items: Item[] = this.carritoSource.getValue();

        items.forEach((el) => {
            if(el.id === id){
                if(action)
                    el.cantidad++
                else
                    if(el.cantidad > 1)
                        el.cantidad--
            }
        });

        this.carritoSource.next(items);
    }

    /**
     * Obtiene la lista de los items del carrito de compras
     * en su máxima crudeza
     * 
     * @returns Item[]
     */
    getAll(): Item[]{
        return this.carritoSource.getValue();
    }

    /**
     * Obtiene la cantidad total de la factura a pagar
     */
    getTotal(): number{
        const items: Item[] = this.carritoSource.getValue();
        let total = 0;
        if(!items.length){
            return 0;
        }

        items.forEach((val) => total += (val.cantidad * val.precio));

        return total;
    }
}