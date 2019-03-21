import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../loader.service';
import { Store } from '@ngrx/store';
import { CreatedCourse, UpdatedCourse } from '../reducers/courses.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import isNumberValidator from '../numberValidator';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  course: Course = new Course();

  courseForm = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    creationDate: new FormControl('', [ Validators.required]),
    duration: new FormControl('', [ Validators.required, isNumberValidator]),
    authors: new FormControl('', [ Validators.required, ])
  });
  private creatingCourse: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService,
              private loaderService: LoaderService, private store: Store<Course[]>) {  }

  ngOnInit() {
    const datePipe = new DatePipe('en-US');
    this.route.params.subscribe( data => {
      const id = data['id'];
      if (id === 'new') {
        this.creatingCourse = true;
        return;
      }
      this.courseService.getItemById(+id)
        .subscribe(value => {
          this.loaderService.hideLoader();
          const course = value;
          if (!course) {
            this.router.navigate(['404NotFound']);
            return;
          } else {
            this.course = course;
            this.courseForm.patchValue(course);
            const creationDate = datePipe.transform(this.course.creationDate,'yyyy-MM-dd');
            this.courseForm.patchValue({creationDate});
          }
        });
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
    this.course = {...this.course, ...this.courseForm.value};
    const course: any = {...this.course};
    const datePipe = new DatePipe('en-US');
    course.creationDate = datePipe.transform(course.creationDate,'MM.dd.yy');
    if (this.creatingCourse) {
      this.courseService.createCourse(course).subscribe(() => {
        this.store.dispatch(new CreatedCourse(course));
        this.loaderService.hideLoader();
      });
    } else {
      this.courseService.updateItem(course.id, course).subscribe(() => {
        const { id } = course;
        this.store.dispatch(new UpdatedCourse({course, id}));
        this.loaderService.hideLoader();
      });
    }
    this.router.navigate(['courses']);
  }

  onClickBack() {
    this.router.navigate(['courses']);
  }
}
