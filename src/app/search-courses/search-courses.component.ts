import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, from, Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnInit {
  @Output() onFind: EventEmitter<string> = new EventEmitter<string>();

  query = new FormControl();
  obs: Subject<string>;

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

    this.query.valueChanges.subscribe(value => {
      console.log(value);
      this.obs.next(value);
      console.log('find');
    });
  }
}
