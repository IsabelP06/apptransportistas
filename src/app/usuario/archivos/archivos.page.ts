import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegistroConformidad } from 'src/app/core/models/registro-conformidad';
import { RegistroConformidadService } from 'src/app/core/services/registro-conformidad.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.page.html',
  styleUrls: ['./archivos.page.scss'],
})
export class ArchivosPage implements OnInit {
  editarEntregaGuia:boolean = false;
  guiaEditar:string ="";
  loading: boolean = true;
  registro: RegistroConformidad = new RegistroConformidad();
  guias_remision: string[] = [];
  guias_entregadas: string[] = [];
  file: any;
  loadingfile: boolean = false;
  constructor(public route: Router, public toastController: ToastController, public activeroute: ActivatedRoute, public _sregistros: RegistroConformidadService) { }
  ngOnInit() {
    this.loadingfile=false;
    this.guias_entregadas=[];
    this.activeroute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.loading = true;
      this._sregistros.getDetailRegistro(id).subscribe(data => {
        this.registro = data.registro;
        this.loading = false;
        if(this.registro.pdf_guia_transportista){
        var linksarchivos = this.registro.pdf_guia_transportista.split(';');
        var entregados=linksarchivos.reduce((a, b) => {
          var value=b.split('_')[3];
          if (value) {
              a.push(value);
          }
          return a;
        }, []);
        this.guias_entregadas=entregados;
        var all_guias=this.registro.guias_de_remision.split('/');
        var pendientes=all_guias.reduce((a, b) => {
          var entregado=this.guias_entregadas.find((x)=>{
            return x==b || x+"*"==b;
          });
          if (!entregado) {
              a.push(b);
          }
          return a;
        }, []);
        this.guias_remision = pendientes;
        }else{
          this.guias_remision = this.registro.guias_de_remision.split('/');
        }
      }, error => {
        this.route.navigate(['/transportista/home']);
      });
    });
  }
  subirArchivos(av: any, guia: string) {
    var file1 = av.srcElement[0].files[0];
    var file2 = av.srcElement[1].files[0];
    const formData = new FormData();
    var guiaa=guia.replace("*","");
    formData.append('guia_transportista', file1);
    formData.append('guia_cobranza', file2);
    formData.append('id', this.registro.id);
    formData.append('guia_de_remision', guiaa);
    if (file1 && file2) {
      this.loadingfile = true;
      this._sregistros.subirArchivos(formData).subscribe(data => {
        this.loadingfile = false;
        if(data.success) {
          this.guias_remision=this.guias_remision.filter((g)=>g!=guia);
          this.guias_entregadas.push(guiaa);
          this.presentToast(data.message);
        }else{
          this.presentToast(data.message);
        }
      }, error => {
        this.loadingfile = false;
        this.presentToast('Error al subir los archivos');
      });
    } else {
      this.presentToast('Debe seleccionar ambos archivos');
    }
  }
  subirArchivosEditado(av: any, guia: string) {
    var file1 = av.srcElement[0].files[0];
    var file2 = av.srcElement[1].files[0];
    const formData = new FormData();
    var guiaa=guia.replace("*","");
    formData.append('guia_transportista', file1);
    formData.append('guia_cobranza', file2);
    formData.append('id', this.registro.id);
    formData.append('guia_de_remision', guiaa);
    if (file1 && file2) {
      this.loadingfile=true;
      this._sregistros.editarArchivos(formData).subscribe(data=>{
        this.loadingfile=false;
        if(data.success) {
          this.editarEntregaGuia=false;
          this.presentToast(data.message);
        }else{
          this.presentToast(data.message);
        }
      },err=>{
        this.loadingfile=false;
        this.presentToast("Error al subir archivos");
      })
      this.presentToast('Subiendo archivos');
    } else {
      this.presentToast('Debe seleccionar ambos archivos');
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 10000
    });
    toast.present();
  }
  editEntregaFile(guia: string) {
    this.editarEntregaGuia = true;
    this.guiaEditar = guia;
  }
  closeFormEditar() {
    this.editarEntregaGuia = false;
  }
}
