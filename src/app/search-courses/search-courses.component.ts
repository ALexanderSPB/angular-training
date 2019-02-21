import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnInit {
  public query: string;
  @Output() onFind: EventEmitter<string> = new EventEmitter<string>();

  onFindClick() {
    this.onFind.emit(this.query);
    console.log('find')
  }

  constructor(private router: Router) { }

  ngOnInit() { }
}
