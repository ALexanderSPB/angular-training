import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { CourseService } from '../course.service';
import { root } from 'rxjs/internal-compatibility';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  public course: Course = new Course();
  public authors = '';
  private creatingCourse: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) {  }

  ngOnInit() {
    this.route.params.subscribe( data => {
      const id = data['id'];
      if (id === 'new') {
        this.creatingCourse = true;
        return;
      }
      const course = this.courseService.getItemById(+id);
      if (!course) {
        this.router.navigate(['404NotFound']);
        return;
      } else {
        this.course = course;
      }
    });
  }

  set courseDate(value) {
    this.course.creationDate = new Date(value);
  }

  get courseDate() {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(this.course.creationDate,'yyyy-MM-dd');
  }

  onClickSave() {
    if (this.creatingCourse) {
      this.courseService.createCourse(this.course);
    } else {
      this.courseService.updateItem(this.course.id, this.course);
    }
    this.router.navigate(['courses']);
  }

  onClickBack() {
    this.router.navigate(['courses']);
  }
}
