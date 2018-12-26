import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { NameFilterPipe } from "../name-filter.pipe";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  courseList: Course[] = [];
  allCourses: Course[];
  onLoadMoreClick() {
    console.log('load more');
  };
  constructor(private nameFilter: NameFilterPipe) {}

  ngOnInit() {
    console.log('ngOnInit');
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

    this.allCourses = Array.from(this.courseList)
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

  filterCourseList(courseName: string) {
    console.log(courseName);
    if (!courseName) {
      this.courseList = Array.from(this.allCourses);
      return;
    }
    this.courseList = this.nameFilter.transform(this.allCourses, courseName);
  }
}
