import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnInit {
  onFindClick() {
    console.log('find')
  }

  constructor() { }

  ngOnInit() {
  }

}
