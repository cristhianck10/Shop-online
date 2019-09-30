import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RestApiService } from './../rest-api.service';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { Producto } from './../interfaces/producto';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.page.html',
  styleUrls: ['./list-categoria.page.scss'],
})
export class ListCategoriaPage implements OnInit {

  productos: Producto[];
  productos_l: Producto[];
  isItemAvailable: boolean;
  nick: string="";
  email: string="";

  constructor(public menu: MenuController,
    public http: HttpClientModule,
    public router: Router,
    public api: RestApiService,
    private storage: Storage) { }

  ngOnInit() {
    this.getProducto();
    this.storage.get('user').then((val)=>{
      this.nick=val.nick;
      this.email=val.email;
    });
  }

  refCategoria(id:any){
    this.router.navigate(['/categoria-id',id])
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

  async getProducto() {
    this.api.getProducto()
      .subscribe(res => {
        this.productos_l=res;
      }, err => {
        console.log(err);
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

}
