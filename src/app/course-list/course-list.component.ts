import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { NameFilterPipe } from "../name-filter.pipe";
import { CourseService } from '../course.service';

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
  constructor(private nameFilter: NameFilterPipe, private courseService: CourseService) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.courseList = this.courseService.getList();
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck')
  }

  deleteCourse(courseId: number, id: number) {
    console.log('delete course id ', courseId);
    this.courseService.removeItem(courseId);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

  filterCourseList(courseName: string) {
    this.courseService.filterCourseList(courseName);
    this.courseList = this.courseService.getList();
  }
}
