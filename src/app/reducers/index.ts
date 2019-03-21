import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authReducer } from './auth.reducer';
import { coursesReducer } from './courses.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  courses: coursesReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
