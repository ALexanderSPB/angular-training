import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './reducers/auth.reducer';
import { Login, Logout } from './reducers/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfoObs: BehaviorSubject<string>;

  constructor(private store: Store<State>) {
  }

  login(loginName: string, password: string) {
    const loginInfo = `User - ${loginName}`;
    window.localStorage.setItem('loginInfo', loginInfo);
    window.localStorage.setItem('token', loginName);
    this.userInfoObs.next(loginInfo);
    this.store.dispatch(new Login({userName: loginInfo, password}));
  };

  logout() {
    window.localStorage.removeItem('loginInfo');
    window.localStorage.removeItem('token');
    this.store.dispatch(new Logout);
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
    this.store.dispatch(new Login({userName: userInfo, password: 'password'}));
    return this.userInfoObs;
  }
}
