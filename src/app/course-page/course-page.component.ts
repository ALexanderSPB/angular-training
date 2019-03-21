import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../loader.service';
import { Store } from '@ngrx/store';
import { CreatedCourse, UpdatedCourse } from '../reducers/courses.actions';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import isNumberValidator from '../numberValidator';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  authorList: string[] = [];
  filteredAuthor: Observable<string>;
  course: Course = new Course();

  courseForm = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    creationDate: new FormControl('', [ Validators.required]),
    duration: new FormControl('', [ Validators.required, isNumberValidator]),
    authors: new FormArray([
      this.createAuthor()
    ], [ Validators.required, ])
  });
  private creatingCourse: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService,
              private loaderService: LoaderService, private store: Store<Course[]>, private http: HttpClient) {
    this.filteredAuthor = this.authors.valueChanges
      .pipe(
        startWith(''),
        map(author => author ? this._filterAuthors(author) : this.authorList.slice())
      );
  }

  private _filterAuthors(value): string[] {
    const filterValue = value[0];

    return this.authorList.filter(author => author.name.toLowerCase().indexOf(filterValue) === 0);
  }

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

    this.http.get('http://localhost:3000/authors').subscribe(data => {
      this.authorList = data;
    });
    this.courseForm.controls['authors'].valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  createAuthor() {
    return new FormControl();
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
