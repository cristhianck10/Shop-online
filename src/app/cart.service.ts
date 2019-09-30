import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  cart:any[]=[];
  constructor(public storage:Storage) { }

  ngOnInit(){
    
  }

  getCart(){
    return this.cart;
  }
  
  addProduct(Product){
    this.load()
    this.cart.push(Product);
    localStorage.setItem('cart',JSON.stringify(this.cart));
    console.log(localStorage.getItem('cart'));
    
  }

  load(){
    if(JSON.parse(localStorage.getItem('cart'))){
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    //this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  removeProduct(Product){
    let index =this.cart.indexOf(Product);
    let inx:number=1;
    for(var i=0;i<this.cart.length;i++){
      let any= JSON.parse(this.cart[i]);
      if(any.id==Product.id){
        this.cart.splice(i,1)
        break;
      }
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));
    this.load();
  }

  clear(){
    localStorage.clear();
  }

}
