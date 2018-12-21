import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCoursesComponent } from './search-courses.component';
import { FormsModule } from '@angular/forms';

describe('SearchCoursesComponent', () => {
  let component: SearchCoursesComponent;
  let fixture: ComponentFixture<SearchCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCoursesComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', () => {
    spyOn(console, 'log');
    component.onFindClick();
    expect(console.log).toHaveBeenCalledWith('find');
  });
});
