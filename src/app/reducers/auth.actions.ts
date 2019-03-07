import { Action } from '@ngrx/store';

export enum ActionTypes {
  Login = 'LOGIN',
  Logout = 'LOGOUT'
}

export class Login implements Action {
  readonly type = ActionTypes.Login;

  constructor(private payload: {userName: string, password: string}) {
  }
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout
}

