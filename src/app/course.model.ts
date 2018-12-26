export interface CourseModel {
  id: number,
  title: string,
  creationDate: Date,
  duration: number,
  description: string,
  topRated: boolean
}

export class Course implements CourseModel {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
}
