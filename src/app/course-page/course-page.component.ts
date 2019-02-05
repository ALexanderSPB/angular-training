import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  public course;
  public title;
  public duration;
  public date;
  public description;
  public authors;
  constructor(private router: Router, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.course = this.route.paramMap.pipe(
      switchMap(params => {
        return params.get('course');
      })
    );

    this.title = this.course.title;
    this.duration = this.course.duration;
    this.date = this.course.creationDate;
    this.description = this.course.description;
    this.authors = '';
  }

  onClickSave() {
    console.log('save');
  }

  onClickBack() {
    this.router.navigate(['courses-page']);
  }
}
