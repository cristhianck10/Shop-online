import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Usuario } from './../interfaces/usuario';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: Usuario;
  nick: string ="";
  pass: string ="";

  constructor(public api: RestApiService, 
    public loadingController: LoadingController,
    public router: Router,
    public http: HttpClientModule,
    public alert: AlertController,
    private storage: Storage) {}

    ngOnInit() {  
    }

    async login(){
      let body = {
        nick: this.nick,
        pass: this.pass
      };
      this.api.getUsuarioById(this.nick,this.pass,body).subscribe(async(usuario : Usuario)=>{
        if(usuario.success==true){
          this.user=usuario;
          this.storage.set('user',this.user);
          this.storage.get('user').then((val)=>{
          });
          this.router.navigate(['/general']);
          //Poner aqui la pagina
        }else{
          const alerta = await this.alert.create({
            header: 'Error',
            message: 'Revise los datos ingresados',
            buttons: ['OK']
          });
          await alerta.present();
        }
      });
    }

    proccessRegister(){
      this.router.navigate(['/register']);
    }

}
