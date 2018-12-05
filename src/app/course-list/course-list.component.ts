import {Component, DoCheck, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  courseList: Course[] = [];
  onLoadMoreClick() {
    console.log('load more');
  };
  constructor() {
  }

  ngOnInit() {
    console.log('ngOnInit');
    for (let i = 0; i < 6; i++) {
      this.courseList.push({
        id: i,
        title: `title${i}`,
        date: new Date(),
        duration: 100 + i,
        description: `Course description ${i}`
      })
    }
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck')
  }

  deleteCourse(courseId: number, id: number) {
    console.log('delete course id ', courseId);
    this.courseList.splice(id, 1);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }
}
