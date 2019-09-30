import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RestApiService } from './../rest-api.service';
import { Producto } from './../interfaces/producto';
import { Storage } from '@ionic/storage';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto: Producto[];
  productos_categoria: Producto[];
  productos: Producto[];
  productos_l: Producto[];
  isItemAvailable: boolean;
  nick: string="";
  email: string="";
  argumentos:any;
  cantidad: number=1;

  constructor(public ar:ActivatedRoute,
    public menu: MenuController,
    public loadingController: LoadingController,
    public http: HttpClientModule,
    public router: Router,
    public api: RestApiService,
    private storage: Storage,
    public c:CartService) { }

  ngOnInit() {
    this.argumentos= this.ar.snapshot.paramMap.get('id');
    this.getProducto();
    this.getProductoById();
    this.storage.get('user').then((val)=>{
      this.nick=val.nick;
      this.email=val.email;
    });
  }
  getProductoById(){
    this.api.getProductoById(this.argumentos).subscribe(res=>{
      this.producto=res;
    })
  }
  agregarAlCarrito(){    
    for(let i=0;i<this.cantidad;i++){
      this.c.addProduct(this.producto)
    }
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
}
