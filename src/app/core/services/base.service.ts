import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Config from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T, S>{
  public host: string = Config.host;
  public tokenUser: string = Config.tokenUser;
  constructor(public http: HttpClient, @Inject("link") public link: string, @Inject("id") public id: S) {
  }
  get url(): string {
    return `${this.host}/${this.link}`;
  }
  all(): Observable<T[]> {
    return this.http.get<T[]>(this.url, { headers: this.headers() });
  }
  allPaginate(pageSize: number, pageIndex: number): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}?pageSize=${pageSize}&pageIndex=${pageIndex}`, { headers: this.headers() });
  }
  pagination(data: any): Observable<T[]> {
    return this.http.post<T[]>(`${this.url}/paginate`, data, { headers: this.headers() });
  }
  detail(id: string): Observable<T> {

    return this.http.get<T>(`${this.url}/${id}`, { headers: this.headers() });
  }
  edit(id: string, object: T): Observable<any> {
    return this.http.put(`${this.url}/${id}`, object, { headers: this.headers() });
  }
  create(object: T): Observable<any> {
    return this.http.post(this.url, object, { headers: this.headers() });
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers() });
  }
  autenticated():Observable<any>{
    return this.http.post(`${this.host}/api/auth/logued`,{},{headers: this.headers()});	
  }
  headers() {
    if (!this.tokenUser) {
      this.refreshToken();
    }
    const autorization = new HttpHeaders({
      "Authorization": `${this.tokenUser}`,
    });
    return autorization
  }
  refreshToken() {
    this.tokenUser = Config.tokenUser;

  }
}
