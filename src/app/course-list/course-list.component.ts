import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { NameFilterPipe } from "../name-filter.pipe";
import { CourseService } from '../course.service';
import { LoaderService } from '../loader.service';
import { Store } from '@ngrx/store';
import { GetCourses } from '../reducers/courses.actions';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  courseList: Course[] = [];
  limit = 3;
  page = 1;

  onLoadMoreClick() {
    this.limit++;
    this.searchCourses();
    console.log('load more');
  };
  constructor(private nameFilter: NameFilterPipe, private courseService: CourseService,
              private loaderService: LoaderService, private store: Store<Course[]>) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.searchCourses();
  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck')
  }

  searchCourses() {
    const { page, limit } = this;
    this.courseService.getList(page, limit).subscribe(courseList => {
      courseList.forEach(course => course.creationDate = new Date(course.creationDate));
      this.courseList = courseList;
      this.store.dispatch(new GetCourses(courseList));
      this.loaderService.hideLoader();
    });
  }

  deleteCourse(courseId: number) {
    this.courseService.removeItem(courseId).subscribe(res => {
      this.searchCourses();
      this.loaderService.hideLoader();
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

  filterCourseList(courseName: string) {
    this.courseService.filterCourseList(courseName).subscribe((courseList: Course[]) => {
      courseList.forEach(course => course.creationDate = new Date(course.creationDate));
      this.courseList = courseList;
      this.store.dispatch(new GetCourses(courseList));
      this.loaderService.hideLoader();
    });
  }
}
