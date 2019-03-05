import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, from, Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnInit {
  @Output() onFind: EventEmitter<string> = new EventEmitter<string>();
  obs: Subject<string>;

  onChange(event) {
    console.log(event);
    this.obs.next(event);
    console.log('find');

  }

  constructor() { }

  ngOnInit() {
    this.obs = new Subject();
    this.obs
      .pipe(
        debounce(() => timer(1000))
      )
      .subscribe(value => {
        if (value.length < 3) {
          return;
        }
        this.onFind.emit(value);
      });
  }
}
