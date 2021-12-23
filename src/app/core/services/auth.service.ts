import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User,string> {
  user:User=new User();
  constructor(public http:HttpClient) {
    super(http,"auth","");
   }
   login(user:string,password:string):Observable<any> {
    return this.http.post(`${this.host}/api/auth/user`,{correo:user,password:password});
  }
}
