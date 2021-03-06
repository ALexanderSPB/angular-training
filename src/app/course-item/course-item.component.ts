import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit {
  @Input() course: Course;
  @Output() onDeleteClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) { }
  ngOnInit() {
  }

  editCourse() {
    this.router.navigate(['courses/', this.course.id]);
  }
}
