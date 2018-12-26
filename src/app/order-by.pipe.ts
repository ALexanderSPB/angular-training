import { Pipe, PipeTransform } from '@angular/core';
import { Course } from "./course.model";

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courseList: Array<object>, args?: any): any {
    return courseList.sort((a: Course, b: Course) => {
      return a.creationDate.getTime() - b.creationDate.getTime();
    });
  }

}
