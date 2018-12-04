import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courseList: Course[] = [];
  onLoadMoreClick() {
    console.log('load more');
  };
  constructor() {
    for (let i = 1; i < 6; i++) {
      this.courseList.push({
        id: i,
        title: `title${i}`,
        date: new Date(),
        duration: 100 + i,
        description: `Course description ${i}`
      })
    }
  }

  ngOnInit() {
  }

}
