import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfoObs: BehaviorSubject<string>;

  constructor() {
  }

  login(token: string, loginInfo: string) {
    window.localStorage.setItem('loginInfo', loginInfo);
    window.localStorage.setItem('token', token);
    this.userInfoObs.next(loginInfo)
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

  getObservable() {
    const userInfo = this.getUserInfo();
    this.userInfoObs = new BehaviorSubject(userInfo);
    return this.userInfoObs;
  }
}
