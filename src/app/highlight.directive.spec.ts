import { HighlightDirective } from './highlight.directive';
import { Course } from './course.model';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CourseItemComponent } from './course-item/course-item.component';
import { DurationPipe } from './duration.pipe';

@Component({
  template: `
    <app-course-item [course]="course" [appHighlight]="course.creationDate">
    </app-course-item>
  `
})
class TestHostComponent {
  course: Course = {
    id: 0,
    title: `title${0}`,
    creationDate: new Date(),
    duration: 100,
    description: `Course description`,
    topRated: true
  }
}

describe('HighlightDirective', () => {
  let fixture, nativeElement, courseContainer, component;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        CourseItemComponent,
        DurationPipe,
        HighlightDirective
      ]
    }).createComponent(TestHostComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
  });
  it('should set green border', () => {
    courseContainer = nativeElement.querySelector('.course');
    console.log(component.course);
    fixture.detectChanges();
    console.log(component.course);
    expect(courseContainer.style.border).toEqual('2px solid limegreen');
  });
  it('should set blue border', () => {
    courseContainer = nativeElement.querySelector('.course');
    component.course.creationDate = new Date(2019, 3);
    fixture.detectChanges();
    expect(courseContainer.style.border).toEqual('2px solid blue');
  });
});
