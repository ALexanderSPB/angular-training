import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeadlineComponent } from './headline/headline.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { SearchCoursesComponent } from './search-courses/search-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeadlineComponent,
    CourseListComponent,
    CourseItemComponent,
    SearchCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
