import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegistroConformidad } from 'src/app/core/models/registro-conformidad';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegistroConformidadService } from 'src/app/core/services/registro-conformidad.service';
import { StorageService } from 'src/app/core/services/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  info: any = {
    inicio: moment().subtract(1,"month").startOf("month").format('YYYY-MM-DDTHH:mm:ss'),
    fin: moment().format('YYYY-MM-DDTHH:mm:ss'),
    sap_trasportista: "",
    estado: ""
  }
  registros:RegistroConformidad[]=[];
  searched:boolean = false;
  loading: boolean = false
  constructor(public alertController: AlertController, public _transportista: AuthService, public _storage: StorageService, public router: Router, public _sregistro: RegistroConformidadService) { }
  ngOnInit() {
  }
  buscar() {

    if (this.info.inicio && this.info.fin) {
      this.searched=true;
      this.loading = true;
      this.info.sap_trasportista = this._transportista.user.sap;
      this._sregistro.getRegistros(this.info).subscribe((data:any) => {
        console.log(data);
        this.registros = data.registros;
        this.loading = false;
        console.log(this.registros);
      })
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar sesión!',
      message: '¿Desea cerrar su <strong>sesión ?</strong>',
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
            if (this._storage.__init__) {
              (async () => {
                const exit = await this._storage.delete("user_auth");
                this.router.navigate(['/']);

              })()
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
