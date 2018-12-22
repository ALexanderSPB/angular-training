import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnInit {
  private query: string;
  @Output() onFind: EventEmitter<string> = new EventEmitter<string>();

  onFindClick() {
    this.onFind.emit(this.query);
    console.log('find')
  }

  constructor() { }

  ngOnInit() {
  }

}
