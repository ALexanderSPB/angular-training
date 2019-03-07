import { Action } from '@ngrx/store';
import { Course } from '../course.model';

export enum ActionTypes {
  GotCourses = 'GOT_COURSES',
  CreatedCourse = 'CREATED_COURSE',
  UpdatedCourse = 'UPDATED_COURSE'
}

export class GetCourses implements Action {
  readonly type = ActionTypes.GotCourses;

  constructor(private payload: Course[]) {}
}
export class CreatedCourse implements Action {
  readonly type = ActionTypes.CreatedCourse;

  constructor(private payload: Course) {}
}
export class UpdatedCourse implements Action {
  readonly type = ActionTypes.UpdatedCourse;

  constructor(private payload: {course: Course, id: number}) {}
}
