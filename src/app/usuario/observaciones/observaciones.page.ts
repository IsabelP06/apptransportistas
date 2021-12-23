import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observacion } from 'src/app/core/models/observacion';
import { ObservacionRegistro } from 'src/app/core/models/observacion-registro';
import { RegistroConformidad } from 'src/app/core/models/registro-conformidad';
import { RegistroConformidadService } from 'src/app/core/services/registro-conformidad.service';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.page.html',
  styleUrls: ['./observaciones.page.scss'],
})
export class ObservacionesPage implements OnInit {
  loading: boolean = true;
  registro: RegistroConformidad = new RegistroConformidad();
  observaciones: Observacion[] = [];
  newobservation: ObservacionRegistro = new ObservacionRegistro();
  constructor(public route: Router,public toastController: ToastController, public activeroute: ActivatedRoute, public _sregistros: RegistroConformidadService) { }
  ngOnInit() {
    this.activeroute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loading = true;
      this._sregistros.getDetailWithObservations(id).subscribe(data => {
        this.registro = data.registro;
        this.observaciones = data.observaciones;
        this.loading = false;
        console.log(data);
      }, error => {
        this.route.navigate(['/transportista/home']);
      });
    });
  }
  addObservation() {
    console.log(this.registro);
    this.newobservation.registro_conformidad_id = this.registro.id;
    this._sregistros.createObservation(this.newobservation).subscribe(data => {
      var observacion=data?.data;
      if (data?.success) {
        var obs = this.observaciones.find(x => x.id == this.newobservation.observacion_id);
        if (obs) {
          observacion.nombre = obs.nombre;
        }
        this.registro.observations.push(observacion);
        this.newobservation = new ObservacionRegistro();
        this.presentToast('Observación agregada');
      } else {
        this.presentToast('Error al agregar observación');
      }
    }, error => {
      
      this.presentToast('Error al agregar observación');
    });
  }
  deleteObservation(id:string){ 
    this._sregistros.deleteObservation(id).subscribe(data => {
      if (data.success) {
        this.registro.observations = this.registro.observations.filter(x => x.id != id);
        this.presentToast('Observación eliminada');
      } else {
        this.presentToast('Error al eliminar observación');
      }
    }, error => {
      this.presentToast('Error al eliminar observación');
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