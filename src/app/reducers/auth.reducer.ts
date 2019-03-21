import { ActionTypes } from './auth.actions';

export interface State {
  userName: string,
  password: string
}

export const initialState: State = {
  userName: null,
  password: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.Login:
      return action.payload;
    case ActionTypes.Logout:
      return initialState;
    default:
      return state;
  }
}
