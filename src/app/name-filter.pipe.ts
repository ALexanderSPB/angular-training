import { Pipe, PipeTransform } from '@angular/core';
import { Course } from "./course.model";

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(courseList: Array<Course>, name: string): any {
    return courseList.filter(course => course.title.includes(name))
  }

}
