export interface CourseModel {
  id: number,
  title: string,
  date: Date,
  duration: number,
  description: string
}

export class Course implements CourseModel {
  id: number;
  title: string;
  date: Date;
  duration: number;
  description: string;
}
