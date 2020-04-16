import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // localUrl = 'http://localhost:3000/api/'
  // localUrl = '/api/'
  localUrl = 'https://citizen-science-app.herokuapp.com/api/'

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(this.localUrl + 'login', data)
  }

  register(data) {
    return this.http.post(this.localUrl + 'register', data)
  }
}