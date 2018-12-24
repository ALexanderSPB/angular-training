import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { SearchCoursesComponent } from '../search-courses/search-courses.component';
import { CourseItemComponent } from '../course-item/course-item.component';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from "../highlight.directive";
import { OrderByPipe } from "../order-by.pipe";
import { DurationPipe } from "../duration.pipe";
import { NameFilterPipe } from "../name-filter.pipe";

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseListComponent,
        SearchCoursesComponent,
        CourseItemComponent,
        HighlightDirective,
        OrderByPipe,
        DurationPipe
      ],
      imports: [
        FormsModule
      ],
      providers: [
        NameFilterPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load more courses', () => {
    spyOn(console, 'log');
    component.onLoadMoreClick();
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalled();
  });

  it('should log ngOnchanges', () => {
    component.ngOnChanges();
    spyOn(console, 'log');
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalled();
  });
  it('should delete course', () => {
    component.courseList = [
      {
        id: 0,
        title: `title${0}`,
        creationDate: new Date(),
        duration: 100,
        description: `Course description`,
        topRated: true
      }
    ];
    component.deleteCourse(0, 0);
    fixture.detectChanges();
    expect(component.courseList).toEqual([]);
  });
});
