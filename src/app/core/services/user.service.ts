import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User, string> {

  constructor(public http: HttpClient) {
    super(http, "user", "");
  }
  editPassword(user: any): Observable<any> {
    return this.http.post(`${this.host}/api/transportista/changepassword`, user, { headers: this.headers() });
  }
  editCorreo(user:any): Observable<any> {
    return this.http.post(`${this.host}/api/transportista/changecorreo`, user, { headers: this.headers() });
  }
}
