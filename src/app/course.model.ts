export interface Course {
  id: number,
  title: string,
  date: Date,
  duration: number,
  description: string
}

export class CourseClass implements Course {
  id: number;
  title: string;
  date: Date;
  duration: number;
  description: string;
}
