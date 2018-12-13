import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;
  @Output() onDeleteClick: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit() {
  }
}
