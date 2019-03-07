import { ActionTypes, UpdatedCourse } from './courses.actions';
import { Course } from '../course.model';


export const initialState: Course[] = [];

export function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GotCourses:
      return action.payload;
    case ActionTypes.CreatedCourse:
      return [...state, action.payload];
    case ActionTypes.UpdatedCourse:
      const updatedCourse = action.payload.course;
      const updatedCourseId = state.findIndex(course => course.id === action.payload.id);
      return [...state.slice(0, updatedCourseId), updatedCourse, ...state.slice(updatedCourseId + 1)];
    default:
      return state;
  }
}
