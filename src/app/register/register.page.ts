import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  cedula: string="";
  nick: string="";
  pass: string="";
  email: string="";
  tarjeta: string="";

  constructor(public loadingC: LoadingController,
    public api: RestApiService,
    public router: Router,
    public http: HttpClientModule,
    private storage: Storage) { }

  ngOnInit() {
  }
  async continueRegister(){
    let body={
      cedula: this.cedula,
      nick: this.nick,
      pass: this.pass,
      email: this.email,
      tarjeta: this.tarjeta
    };
    console.log(body);
    const loading = await this.loadingC.create({
      message: 'Cargando',
      duration: 1000
    });
    await loading.present();
    await this.api.createUsuario(body).subscribe(res => {
        this.router.navigate(['/home']);
        loading.dismiss;
    });
    
  }

  formLogin(){
    this.router.navigate(['/home']);
  }

}
