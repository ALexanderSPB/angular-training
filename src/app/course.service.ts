import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { NameFilterPipe } from './name-filter.pipe';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public courseList: Course[] = [];
  allCourses: Course[];

  constructor(private nameFilter: NameFilterPipe) {
    for (let i = 0; i < 10; i++) {
      this.courseList.push({
        id: i,
        title: `title${i}`,
        creationDate: new Date(),
        duration: 100 + i,
        description: `Course description ${i}`,
        topRated: true
      })
    }
    this.courseList[1].creationDate = new Date(2019, 6);
    this.courseList[1].topRated = false;
    this.courseList[2].creationDate = new Date(2017, 6);
    this.courseList[3].topRated = false;
    this.courseList[3].creationDate = new Date(2017, 6);
    this.courseList[4].creationDate = new Date(2019, 6);
    this.courseList[5].creationDate = new Date(2019, 6);
    this.courseList[6].creationDate = new Date(2015, 6);
    this.courseList[7].creationDate = new Date(2016, 6);
    this.courseList[8].creationDate = new Date(2016, 2);

    this.allCourses = Array.from(this.courseList);
  }

  getList() {
    return this.courseList;
  }

  createCourse(course: Course) {
    course.id = this.courseList.length;
    return this.courseList.push(course);
  }

  getItemById(id: number) {
    return this.courseList.find(course => course.id === id);
  }

  updateItem(id: number, course: Course) {
    const index = this.courseList.findIndex(course => course.id === id);
    this.courseList[index] = course;
  };

  removeItem(id: number) {
    const answer = confirm('Do you really want to delete this course? Yes/No');
    if (!answer) {
      return;
    }
    const index = this.courseList.findIndex(course => course.id === id);
    this.courseList.splice(index, 1);
  };

  filterCourseList(courseName: string) {
    console.log(courseName);
    if (!courseName) {
      this.courseList = Array.from(this.allCourses);
      return;
    }
    this.courseList = this.nameFilter.transform(this.allCourses, courseName);
  }
}
