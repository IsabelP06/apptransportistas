import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import Config from 'src/app/core/models/config';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: ''
  };
  messageError: string = "";
  constructor(public _sauth: AuthService, public _storage: StorageService, public router: Router) {
    (async () => {
      if (!this._storage.__init__) {
        const init = await this._storage.init();
      }
      const response = await this._storage.getItem("user_auth");
      if (response) {
        Config.tokenUser = JSON.parse(response).jwt;
        this.router.navigate(["/transportista/home"]);
      }
    })()
  }
  Login(user: any) {
    console.log(user);
    this._sauth.login(user.email, user.password).subscribe(data => {
      console.log(data);
      
      if (data?.success) {
        const value = JSON.stringify({
          id: data.data.id,
          jwt: data.jwt
        });
        (async () => {
          this._sauth.user = data.data;
          if(!this._storage.__init__){
            const init=await this._storage.init();
          }
          const save = await this._storage.setValue('user_auth', value);
          const query = await this._storage.getItem("user_auth");
          if (query) {
            this.router.navigate(["/transportista/home"]);
          }
        })()
      } else {
        this.messageError = data.message;
      }
    });
  }
  ngOnInit() { }
}
