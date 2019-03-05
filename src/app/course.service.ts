import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { NameFilterPipe } from './name-filter.pipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public courseList: Course[] = [];
  BASE_URL: string = 'http://localhost:3000/courses';

  constructor(private nameFilter: NameFilterPipe, private http: HttpClient,
              private loaderService: LoaderService) {}

  getList(page: number, limit: number) {
    this.loaderService.showLoader();
    return this.http.get<Course[]>(`${this.BASE_URL}`, {
      params: {
        _page: page.toString(),
        _limit: limit.toString()
      },
    });
  }

  createCourse(course: Course) {
    this.loaderService.showLoader();
    return this.http.post(`${this.BASE_URL}`, course)
  }

  getItemById(id: number): Observable<any> {
    this.loaderService.showLoader();
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  updateItem(id: number, course: Course) {
    this.loaderService.showLoader();
    return this.http.put(`${this.BASE_URL}/${id}`, course);
  };

  removeItem(id: number) {
    const answer = confirm('Do you really want to delete this course? Yes/No');
    if (!answer) {
      return;
    }

    this.loaderService.showLoader();
    return this.http.delete(`${this.BASE_URL}/${id}`);
  };

  filterCourseList(courseName: string) {
    this.loaderService.showLoader();
    return this.http.get(`${this.BASE_URL}`, {
      params: {
        q: courseName
      }
    })
  }
}
