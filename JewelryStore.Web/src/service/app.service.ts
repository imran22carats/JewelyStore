import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  loginEmitter = new EventEmitter<any>();
  isLoggedIn = false;
  userType = '';
  user = '';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  login(body) {
    return this.http.post('https://localhost:44306/api/account/login', JSON.stringify(body),
      { 'headers': this.headers }).toPromise().then(response => {
        return response;
      });
  }

  calculate(body) {
    return this.http.post('', JSON.stringify(body),
      { 'headers': this.headers }).toPromise().then(response => {
        return response;
      });
  }
}
