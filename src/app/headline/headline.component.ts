import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {
  public courseName: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const index = event.url.lastIndexOf('/');
        const id = +event.url.slice(index + 1);
        if (!isNaN(id)) {
          this.courseService.getItemById(id)
            .subscribe(value => {
              this.courseName = value.title;
          });
        } else {
          this.courseName = '';
        }
      }
    });
  }

  onClick() {
    this.router.navigate(['courses'])
  }
}
