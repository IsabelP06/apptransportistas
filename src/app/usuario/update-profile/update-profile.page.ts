import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {
  usuario:User=new User();
  loadingupdatepassword:boolean=false;
  loadingupdatecorreo:boolean=false;
  editpassword={
    password:"",
    newpassword:"",
    confirmpassword: "",
    transportista:""
  }
  constructor(public _auth:AuthService,public _susuario:UserService,public toastController:ToastController) { }

  ngOnInit() {
    this.usuario=this._auth.user;
  }
  changePassword(editpassword:any){
    editpassword.transportista=this._auth.user.id;
    console.log(editpassword);
    this.loadingupdatepassword=true;
    this._susuario.editPassword(editpassword).subscribe(res=>{
      this.loadingupdatepassword=false;
      if(res.success){

        this.presentToast("Contraseña actualizada");
        this.editpassword.password="";
        this.editpassword.newpassword="";
        this.editpassword.confirmpassword="";
      }else{
        this.presentToast(res.message);
      }
    },err=>{
      this.loadingupdatepassword=false;
      this.presentToast("Error no se podido actualizar la contraseña");
    })
  }
  editCorreo(){
    const data={
      correo:this.usuario.correo,
      transportista:this._auth.user.id
    }
    this.loadingupdatecorreo=true;
    this._susuario.editCorreo(data).subscribe(res=>{
      this.loadingupdatecorreo=false;
      if(res.success){
        this.presentToast("Correo actualizado");
      }else{
        this.presentToast("Error al actualizar correo");
      }
    },err=>{
      this.loadingupdatecorreo=false;
      this.presentToast("Error al actualizar correo");
    });
  }
  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
