import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './productos.service';
import { ConfgFooterService } from './confg-footer.service';

@Injectable({providedIn: 'root'})
export class ProductsBehaviorService {
    
    productsSource: BehaviorSubject<Producto[]> = new BehaviorSubject([]);
    productsItems: Observable<Producto[]> = this.productsSource.asObservable();

    productListValue: string;
    productListValue2:string;
    constructor(private configFooterService: ConfgFooterService){}

    updateSource(products: Producto[],index_:number=null): void{
        if(index_==null){
            
            this.parseDefaultPrice(products).then(value => {
                this.productsSource.next(value);
            })         
        } else{
           
             let productsArr: Producto[];
            productsArr = [ products[index_]];
            this.parseDefaultPrice(productsArr).then(value => {
                this.productsSource.next(value);
            })   

        } 
        /* console.log(index_);
        console.log(products); */
        
    }

    getAllTheSourceValue(): Producto[]{
        return this.productsSource.value;
    }

    protected async updateProductListPrice(){
        const resp: any = await this.configFooterService._getConfigFooter().toPromise();
       // console.log(resp);
        if(!resp){
            this.productListValue = "precioL1";
            this.productListValue2 = "precioL1";
            return;
        }
        this.productListValue = `precioL${!isNaN(resp.listaPrecio) && (resp.listaPrecio >= 1 &&  resp.listaPrecio <= 9)? resp.listaPrecio : 1}`;
        this.productListValue2 = `precioL${!isNaN(resp.listaPrecioDistribuidor) && (resp.listaPrecioDistribuidor >= 1 &&  resp.listaPrecioDistribuidor <= 9)? resp.listaPrecioDistribuidor : 1}`;

    }

    /**
     * Parsea una lista de productos que no tenga defaulPrice
     * Obtiene la información de la configuración del footer
     * y así setea el valor de la lista de producto a defaultPrice
     * 
     * @ignore todos aquellos productos que no tengan precio por default
     * serán removidos de la lista
     * 
     * @param products 
     */
    async parseDefaultPrice(products: Producto[]): Promise<Producto[]>{
        let aux: Producto[] = [];

        if(!products.length){
            return [];
        }

        if(!this.productListValue){
            await this.updateProductListPrice();
        }

        products.forEach((product)=> {
            product.defaultPrice = product[this.productListValue];
            product.defaultPrice2 =product[this.productListValue2]
            if(Number(product.defaultPrice)){//es 0 si viene vacío o null
                aux.push(product);
            }
        });

        return aux;
    }


}