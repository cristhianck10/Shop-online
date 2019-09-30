import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RestApiService } from './../rest-api.service';
import { Producto } from './../interfaces/producto';
import { Storage } from '@ionic/storage';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private cartService: CartService,
    public menu: MenuController,
    public loadingController: LoadingController,
    public http: HttpClientModule,
    public router: Router,
    public api: RestApiService,
    private storage: Storage) { }
 
  selectedItems=[];
  total=0;
  cart:any[]=[];
  car:any[]=[];

  productos: Producto[];
  productos_l: Producto[];
  isItemAvailable: boolean;
  nick: string="";
  email: string="";
  ngOnInit() {
    this.getProducto();
    this.storage.get('user').then((val)=>{
      this.nick=val.nick;
      this.email=val.email;
    });


    this.loadcart();
    let items = this.car;
    let selected= {};
    for (let obf of items) {
      if(selected[obf.id]){
        selected[obf.id].count++;
      }else{
        selected[obf.id]={...obf, count: 1};
      }
    }
    
    this.selectedItems=Object.keys(selected).map(key=>selected[key]);
    console.log(this.selectedItems);
    this.total=this.selectedItems.reduce((a,b)=>a+(b.count*b.precio), 0);    
  }

  async getProducto() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 2000
    });
    await loading.present();
    await this.api.getProducto()
      .subscribe(res => {
        this.productos_l=res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  filtroSearch(ev:any){
    this.getLista();
    const val= ev.target.value;
    if(val && val.trim() !=""){
      this.isItemAvailable=true;
      this.productos = this.productos.filter((item)=>{
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
    else{
      this.isItemAvailable=false;
      this.getLista();
    }
  }
  getLista(){
    this.productos = this.productos_l;
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  cerrar_sesion(){
    this.storage.remove('user');
    this.router.navigate(['/home']);
  }
  
  home(){
    this.router.navigate(['/general']);
  }
  compras(){
    this.router.navigate(['/cart']);
  }
  categoria(){
    this.router.navigate(['/list-categoria']);
  }
  ayuda(){
    this.router.navigate(['/general']);
  }

  loadcart(){
    this.cart=JSON.parse(localStorage.getItem('cart'));
    for(let i=0;i<this.cart.length;i++){
      this.car.push(JSON.parse(JSON.stringify(this.cart[i][0])));
    }
    //this.car.push(JSON.parse(JSON.stringify(this.cart[0])));

    
}

  remove(id:string){
    
    let Producto:Producto;
    this.api.getProductoById(id).subscribe((res:Producto)=>{
      Producto=res;
      console.log(Producto);
    });
    this.cartService.removeProduct(Producto);
    this.router.navigate(['/cart']);
  }

  borrar(){
    localStorage.removeItem('cart');
  }

  comprar(id:string){
    this.router.navigate(['/domicilio',id]);
  }

}
