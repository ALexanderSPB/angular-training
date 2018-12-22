import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Course } from '../course.model';
import { DurationPipe } from "../duration.pipe";

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, DurationPipe],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = {
      title: '1',
      creationDate: new Date(),
      description: '',
      duration: 0,
      id: 0,
      topRated: true
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <app-course-item
      [course]="course"
      (onDeleteClick)="onDelete($event)"
    ></app-course-item>`
})
class TestHostComponent {
  public course: Course = {
    title: '1',
    creationDate: new Date(),
    description: '1',
    duration: 0,
    id: 0,
    topRated: true
  };

  public onDelete() {
  }
}

describe('courseItem testHostComponent', () => {
  let fixture, component, nativeElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, CourseItemComponent, DurationPipe],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should Input', () => {
    fixture.detectChanges();
    const descriptionParagraph = nativeElement.querySelector('.info p');
    expect(descriptionParagraph.innerHTML.trim()).toEqual('1');
  });

  it('should emit delete event', () => {
    const deleteBtn = nativeElement.querySelector('.deleteBtn');
    spyOn(component, 'onDelete');
    deleteBtn.click();
    fixture.detectChanges();
    expect(component.onDelete).toHaveBeenCalled();
  });
});
