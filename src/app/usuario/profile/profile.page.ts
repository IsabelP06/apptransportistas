import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user:User=new User();
  editpassword:boolean = false;
  constructor(public _service:UserService,public toastController:ToastController,public _auth:AuthService,public alertController:AlertController,public _storage:StorageService,public router:Router) {
   }
  ngOnInit() {
   this.user=this._auth.user;
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar cesion!',
      message: 'Desea cerrar su <strong>sesión ?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Si',
          handler: () => {
            if(this._storage.__init__){
              (async() => {
                const exit=await this._storage.delete("user_auth");
                this.router.navigate(['/']);
              })()
            }
          }
        }
      ]
    });
    await alert.present();
  }

  changePassword(){
    if(this.user.passwordnew){
      this._service.editPassword(this.user).subscribe(data=>{
        if(data?.success){
          this.presentToast(data.message);
          this.editpassword=false;
        }else{
          this.presentToast("No se a podido actualizar intentalo mas tarde");
        }
      })
    }
  }
  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
}