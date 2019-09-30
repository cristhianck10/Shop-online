import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RestApiService } from './../rest-api.service';
import { Producto } from './../interfaces/producto';
import { Storage } from '@ionic/storage';
import { Categoria } from './../interfaces/categoria';

@Component({
  selector: 'app-categoria-id',
  templateUrl: './categoria-id.page.html',
  styleUrls: ['./categoria-id.page.scss'],
})
export class CategoriaIdPage implements OnInit {
  productos_categoria: Producto[];
  productos: Producto[];
  productos_l: Producto[];
  isItemAvailable: boolean;
  nick: string="";
  email: string="";
  argumentos:any;
  hola:string="";
  nombreC: Categoria;

  constructor(public ar:ActivatedRoute,
    public menu: MenuController,
    public loadingController: LoadingController,
    public http: HttpClientModule,
    public router: Router,
    public api: RestApiService,
    private storage: Storage) { }

  ngOnInit() {
    this.argumentos= this.ar.snapshot.paramMap.get('id');
    this.getProducto();
    this.storage.get('user').then((val)=>{
      this.nick=val.nick;
      this.email=val.email;
    });
    this.getCategoria();
    this.getProductoCategoria();
  }
  producto(id: any){
    this.router.navigate(['/producto',id]);
  }

  getProductoCategoria(){
    this.api.getProductoCategoria(this.argumentos).subscribe((res:Producto[]) =>{
      this.productos_categoria = res;
    });
  }

  getCategoria(){
    this.api.getCategoria(this.argumentos).subscribe((res: Categoria) =>{
      this.nombreC = res;
      this.hola=this.nombreC.nombre;
    });
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
