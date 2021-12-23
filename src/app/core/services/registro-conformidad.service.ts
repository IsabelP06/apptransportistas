import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservacionRegistro } from '../models/observacion-registro';
import { RegistroConformidad } from '../models/registro-conformidad';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroConformidadService extends BaseService<RegistroConformidad, any> {
  
  constructor(public http: HttpClient) {
    super(http, 'registro_conformidad', 'id');
  }
  getRegistros(info:any): Observable<any> {
    return this.http.post<any>(`${this.host}/api/registro_conformidad`,info, {headers: this.headers()});
  }
  getDetailRegistro(id:any): Observable<any> {
    return this.http.get<any>(`${this.host}/api/registro_conformidad/${id}`, {headers: this.headers()});
  }
  getDetailWithObservations(id:any): Observable<any> {
    return this.http.get<any>(`${this.host}/api/registro_conformidad/observaciones/${id}`, {headers: this.headers()});
  }
  createObservation(info:ObservacionRegistro): Observable<any> {
    return this.http.post<any>(`${this.host}/api/registro_conformidad/observacion`,info, {headers: this.headers()});
  }
  deleteObservation(id:any): Observable<any> {
    return this.http.delete<any>(`${this.host}/api/registro_conformidad/observacion/${id}`, {headers: this.headers()});
  }
  subirArchivos(data: any): Observable<any> {
    return this.http.post<any>(`${this.host}/api/registro_conformidad/archivos`, data, {headers: this.headers()});
  }
  editarArchivos(data: any): Observable<any> {
    return this.http.post<any>(`${this.host}/api/registro_conformidad/archivosupdate`,data, {headers: this.headers()});
  }
}
