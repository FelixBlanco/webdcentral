import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Item{
    id: number | string;
    producto: string;
    marca: string;
    precio: number;
    cantidad: number;
}

export interface detallesCompra{
  
    productos:Item[];
    metodoDePago:string;
    metodoEntrega:string;
    total:number;
    domicilio?:string;
    persona_authorizada?:string;
    codigo_postal?:string;
    localidad?:string;
    personasAutorizadaDni?:string;
    personasAutorizadaPasaport?:string;
    disponibilidad?:string;
    fecha?:string;
    pedidoRealizado?:boolean,
    numeroPedido?:string,
    provincia?:string,
    telefono?:string,
    celular?:string
}

@Injectable()
export class CarritoService {

    carritoSource: BehaviorSubject<Item[]> = new BehaviorSubject([]);
    carritoItems: Observable<Item[]> = this.carritoSource.asObservable();

    orderProducts: BehaviorSubject<any[]> = new BehaviorSubject([]);
    orderItems: Observable<any[]> = this.orderProducts.asObservable();

    orderDetailsBehavior: BehaviorSubject<detallesCompra> = new BehaviorSubject(null);
    orderDetails: Observable<detallesCompra> = this.orderDetailsBehavior.asObservable();

   /*  pedidoRealizado: BehaviorSubject<boolean> = new BehaviorSubject(false);
    pedidoRealizadoData: Observable<boolean> = this.pedidoRealizado.asObservable();

    pedidoNumero: BehaviorSubject<any> = new BehaviorSubject(null);
    pedidoNumeroData: Observable<any> = this.pedidoNumero.asObservable(); */


    constructor(){
    }

    /**
     * Agrega items a la tabla del carrito de compras
     * el siguiente registro debe contar con los siguientes parámetros
     * OBLIGATORIOS
     * 
     * Si el item ya está agregado en la lista se acumulará la cantidad
     * 
     * @param id clave/serial/id del producto
     * @param producto nombre breve
     * @param marca Marca de producto
     * @param cantidad la cantidad bruta de los productos sin decimales en unidades
     * @param precio denominado en ARS con decimales
     */
    addItem(id, producto, marca, cantidad, precio): Item{
        
        if(!id || !producto || !marca || !cantidad || !precio){
            //debugger;
            throw new Error(`${ 
                !id ? 'id' : !producto ? 'producto': !marca ? 'descripion':  !cantidad ? 'cantidad': !precio ? 'precio': ''
            } <= es indefinido o null`);
        }

        let items: Item[] = this.carritoSource.getValue();
        let added: Item;

        if(items.find((item) => item.id === id)){
            items.forEach((item)=>{
                if(item.id === id){
                    item.cantidad += cantidad;
                    added = item;
                }
            });
        }else{
            added = {
                id : id,
                producto : producto,
                marca : marca,
                precio: precio,
                cantidad: cantidad
            }
    
            items.push(added);
        }


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

    incraseOrDecraseItem(id: number | string, action: boolean): void{
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

    setProductsOrder(items: any[]) : void{
        this.orderProducts.next(items);
    }

    clear(): void{
        this.carritoSource.next([]);
    }

    setDetailOrder(data:detallesCompra){
        this.orderDetailsBehavior.next(data);
    }
     /*
    setDetallesLastOrderNumber(data:any){
        this.pedidoNumero.next(data);
    } */
}
