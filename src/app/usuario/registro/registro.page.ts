import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroConformidad } from 'src/app/core/models/registro-conformidad';
import { RegistroConformidadService } from 'src/app/core/services/registro-conformidad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  loading: boolean = true;
  registro:RegistroConformidad=new RegistroConformidad();
  constructor(public route:Router,public activeroute:ActivatedRoute,public _sregistros:RegistroConformidadService) { }
  ngOnInit() {
    this.activeroute.paramMap.subscribe(params => {
      const id=params.get('id');
      this.loading=true;
      this._sregistros.getDetailRegistro(id).subscribe(data=>{
        this.registro=data.registro;
        this.loading=false;
      },error=>{
        this.route.navigate(['/transportista/home']);
      });
    });
  }

  

}
