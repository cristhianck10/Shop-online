import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.page.html',
  styleUrls: ['./domicilio.page.scss'],
})
export class DomicilioPage implements OnInit {

  precio:string="";
  total:number=0;

  constructor(public ar:ActivatedRoute,
    public router:Router) { }

  ngOnInit() {
    this.precio=this.ar.snapshot.paramMap.get('total');
    this.total=parseInt(this.precio)+5000;
  }

  siguiente(){
    this.router.navigate(['/metodo',this.total]);
  }

}
