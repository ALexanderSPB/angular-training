import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursePageComponent } from './course-page/course-page.component';

const routes: Routes = [
  { path: 'courses-page', component: CourseListComponent },
  { path: 'course', component: CoursePageComponent },
  { path: '', redirectTo: 'courses-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
