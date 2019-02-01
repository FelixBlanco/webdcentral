import { Component, OnInit } from '@angular/core';
import { ProductosFavoritosService, productoFavorito } from '../../services/productos-favoritos.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Producto, ProductosService, CarouselItem } from 'src/app/services/productos.service';
import { ConfigColorService } from '../../services/config-color.service';
import { PerfilClienteService } from '../../services/perfil-cliente.service';

declare var $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  nrSelect=19;
  productsList: Producto[];
  chargeCarrousel: boolean;
  inPromise: boolean;
  max:number =19;
  currentPage: number;
  pages: number;
  isFavorite:boolean;
  tittleList: string;

  carouselItems: CarouselItem[] = [];
  list_arbol_p:any;
  colorUno:any;
  colorTres:any;
  favoritosList:productoFavorito[]=[];
  constructor(
    private productsBehavior: ProductsBehaviorService,
    private productosService: ProductosService,
    private _color: ConfigColorService,
    private perfilClienteService:PerfilClienteService,
    private productosFavoritosservices: ProductosFavoritosService
  ) { 
    this.pages = 0;
    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorUno = resp.colorOscuro;
          this.colorTres = resp.colorClaro;
        }        
      }
    ); 
    $('.desplegado').css('display','none');        
  }

  ngOnInit() {
    this.iniBehavior();
    this.iniTittleBehavior();
    this.getArbolProductos();
    
    this.productosFavoritosservices.productsFavoritesItems.subscribe(val=>{
      if(val.length){
        this.favoritosList=val;
      }
    })
    this.getFavoriteProducts();
    // menu desplegable    		
		// $('.desplegar').click(function(){ 
    //   console.log('click menu')
		// 	// 
		// })     
  }

  clickMenu(){
    console.log('click')
    $(this).parent().find("ul.desplegado").toggle('fast'); 
  }

  iniTittleBehavior(){
    this.productosService.productosFilterTittle.subscribe(val => this.tittleList = val);
  }

  generateCarousel(){
    if(!this.productsList){
      return;
    }
    this.carouselItems = [];
    let index: number = 1;
    this.productsList.forEach((val, i) => {
      if(this.isACarruselItem(i)){
        this.carouselItems.push({id: index++, products: this.getPartialItems(i,i+this.max)});
      }
      
    });
   
    this.pages = this.carouselItems.length;
    console.log(this.carouselItems.length);

  }

  isACarruselItem(index): boolean {
    if(index % (this.max+1)){
      return false;
    }
    return true;
  }

  getPartialItems(from, to): Producto[]{
    let items: Producto[] = [];

    this.productsList.forEach((item, i) => {
      if(i >= from &&  i <= to){
        items.push(item);
      }
    });

    return items;
  }

  setProducts(products: Producto[]): void{
    products.forEach( (product) => {
      product.cantidad = !product.cantidad ? 1 : product.cantidad;
    })
    this.productsList = products;

    this.generateCarousel();
  }

  iniBehavior() : void{
    this.productsBehavior.productsItems.subscribe( (products: Producto[]) => {
      this.productsList = [];
      this.setProducts(products);
    });
  }

  setCurrent({current}){
    if(current)
    this.currentPage = current
  }
  MaxRangePartialItem(max:string){
    
    this.max=Number(max);
    console.log(this.max);
     this.generateCarousel(); 
  }

  getArbolProductos(){
    this.productosService._getArbolProductos().subscribe(
      resp => {
        this.list_arbol_p = resp;              
      }
    )
  }
  getFavoriteProducts(){
    console.log("getfaVoriteItems");
    const userId = JSON.parse(localStorage.getItem('user_data')); // recuperamos el id del usuario
    this.perfilClienteService._getPerfilCliente(userId.id).subscribe(
      (resp: any) => {
        // Como ya existe , vamos a editar
        if (resp) {
          console.log(resp.perfil.fk_idPerfilCliente);
          this.productosFavoritosservices.obtenerFavorito(resp.perfil.fk_idPerfilCliente).subscribe(val=>{
            if(val.ok){
             
            this.favoritosList=  val.body.productosFavoritos;
            this.productosFavoritosservices.updateFavoritesSource(val.body.productosFavoritos);
            console.log(this.favoritosList);
            }
            
          })
        
         
        }
       
      },
      error => {
        // Como no hay perfil, le decimos crear            
        console.error(error);
      }) 
  }

}
