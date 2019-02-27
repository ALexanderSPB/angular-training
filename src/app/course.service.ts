import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { NameFilterPipe } from './name-filter.pipe';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public courseList: Course[] = [];
  BASE_URL: string = 'http://localhost:3000/courses';

  constructor(private nameFilter: NameFilterPipe, private http: HttpClient) {}

  getList(page: number, limit: number) {
    return this.http.get<Course[]>(`${this.BASE_URL}`, {
      params: {
        _page: page.toString(),
        _limit: limit.toString()
      },
    });
  }

  createCourse(course: Course) {
    return this.http.post(`${this.BASE_URL}`, course)
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
    return this.http.delete(`${this.BASE_URL}/${id}`);
  };

  filterCourseList(courseName: string) {
    console.log(courseName);
    return this.http.get(`${this.BASE_URL}`, {
      params: {
        q: courseName
      }
    })
  }
}
