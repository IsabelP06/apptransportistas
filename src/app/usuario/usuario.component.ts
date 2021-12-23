import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import Config from '../core/models/config';
import { AuthService } from '../core/services/auth.service';
import { StorageService } from '../core/services/storage.service';
import { UserService } from '../core/services/user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  loading: boolean = true;
  constructor(
     public loadingController: LoadingController,
     public _user: UserService,
     public _auth: AuthService,
     public _storage: StorageService, 
     public router: Router,
     public menu: MenuController,
     public alertController: AlertController
     ) {
       
       
  }
  ngOnInit() {
    
    
    if (!this._auth.user?.id) {
        (async () => {
          if (!this._storage.__init__) {
          const init = await this._storage.init();
          }
          const response = await this._storage.getItem("user_auth");
          if (response) {
            const { jwt } = JSON.parse(response);
            Config.tokenUser = jwt;
            this._user.tokenUser=jwt;
            this._user.autenticated().subscribe(data => {
              if(data){
              if (data.hasOwnProperty("success")) {
                if(data.success){
                  this._auth.user = data.data;
                  this.loading=false;
                }else{
                  (async()=>{
                    const response = await this._storage.delete("user_auth");
                    this.router.navigate(["/"]);
                  })()
                }
              } else {
                (async()=>{
                  const response = await this._storage.delete("user_auth");
                  this.router.navigate(["/"]);
                })()
              }
            }else{
              (async()=>{
                const response = await this._storage.delete("user_auth");
                this.router.navigate(["/"]);
              })()
            }
            },erro=>{
              (async()=>{
                const response = await this._storage.delete("user_auth");
                this.router.navigate(["/"]);
              })()
            })
          } else {
            (async()=>{
              const response = await this._storage.delete("user_auth");
              this.router.navigate(["/"]);
            })()
          }
        })()
     
    } else {
      this.loading = false;
    }
  }
  toogle(){
    console.log("toogle"); 
  }
  closeMenu(){
    setTimeout(()=>{
    this.menu.close('main-menu');
    },500);
  }
  endSession(){
    setTimeout(()=>{
      this.menu.close('main-menu');
      this.presentAlertConfirm();
    },500);
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Si, salir',
          handler: () => {
            (async()=>{
              const response = await this._storage.delete("user_auth");
              this.router.navigate(["/"]);
            })();
          }
        }
      ]
    });

    await alert.present();
  }

}