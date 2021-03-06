import { Component, OnInit ,ViewChild} from '@angular/core';
import { ProductosFavoritosService, productoFavorito } from '../../services/productos-favoritos.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { Producto, ProductosService, CarouselItem } from 'src/app/services/productos.service';
import { ConfigColorService } from '../../services/config-color.service';
import { PerfilClienteService } from '../../services/perfil-cliente.service';
import { ProductosCarouselPageComponent} from './productos-carousel-page/productos-carousel-page.component'

declare var $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @ViewChild(ProductosCarouselPageComponent) carousel:ProductosCarouselPageComponent
  isListView:boolean=false;
  nrSelect=19;
  productsList: Producto[];
  chargeCarrousel: boolean;
  inPromise: boolean;
  max:number =19;
  currentPage: number;
  pages: number;
  isFavorite:boolean;
  tittleList: string;
  productFavoriteList:Producto[]=[];
  carouselItems: CarouselItem[] = [];
  list_arbol_p:any;
  colorUno:any;
  colorTres:any;
  favoritosList:productoFavorito[]=[];
  tipoOrdenamiento :"A-Z"| 'Z-A' | "MenorMayor" |  "MayorMenor" | "RELEVANTE"  = null;
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

  clickMenu(id:any){
    const idNombre = '#posicion_'+id;
    $(idNombre).parent().find("ul.desplegado").toggle('fast'); 
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
  viewMode(view:'LISTA'|'CATALOGO'){ // definir tipo de vista (tabla o lista)
    console.log(view);
    console.log(this.isListView)
      if(this.isListView && view=='CATALOGO'){
        this.productosService.updateView(false);
        this.isListView=false;

      }else if(!this.isListView && view=='LISTA'){
        this.productosService.updateView(true);
        this.isListView=true;
      }
  }
  getFavoritos(){
    
    const userId = JSON.parse(localStorage.getItem('user_data')); // recuperamos el id del usuario
    if(!userId){
      $('#loginModal').modal('toggle');
      return;
    }
    this.productFavoriteList=[];
    if(!this.favoritosList.length){
      this.productsBehavior.updateSource(this.productFavoriteList);
      return
    }
    this.tittleList="FAVORITOS";
    this.inPromise= true;
    this.favoritosList.map((val,i )=>{
      this.productosService.getById(val.fk_idProducto).subscribe(val=>{
       if(val.ok){
         this.productFavoriteList.push(val.body);
         if(i >= this.favoritosList.length-1){
          /*  this.productsList=this.productFavoriteList;
           this.generateCarousel(); */
           this.productsBehavior.updateSource(this.productFavoriteList);
           console.log(this.favoritosList);
           console.log(this.productsList);
           this.inPromise=false;

         }
       }
      })
    })
  }
  OrdenamientoTipo(tipo:"A-Z"| 'Z-A' | "MenorMayor" |  "MayorMenor" | "RELEVANTE"){
    console.log(tipo);


    if(tipo=='MayorMenor'){
    
      this.carousel.orderByMayorAMenor();
    }
    if(tipo=='MenorMayor'){
   
      this.carousel.orderByMenorAMayor();
    }
    if(tipo=='RELEVANTE'){
    
      this.carousel.orderByRelevante();
    }
    if(tipo=='A-Z'){
   
      this.carousel.orderByAZ();
    }
    if(tipo=='Z-A'){
   
      this.carousel.orderByZA();
    }
  }

}
