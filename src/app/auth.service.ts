import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(token: string, loginInfo: string) {
    window.localStorage.setItem('loginInfo', loginInfo);
    window.localStorage.setItem('token', token)
  };

  logout() {
    window.localStorage.removeItem('loginInfo');
    window.localStorage.removeItem('token');
  };

  isAuthentificated() {
    return !!window.localStorage.getItem('token');
  };

  getUserInfo() {
    return window.localStorage.getItem('loginInfo');
  };

  getUserToken() {
    return window.localStorage.getItem('token');
  }
}
