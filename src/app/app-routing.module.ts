import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from 'src/app/modules/main/main.component';
import { StudentsListComponent } from 'src/app/modules/student/students-list/students-list.component';
import { TeachersListComponent } from 'src/app/modules/teacher/teachers-list/teachers-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'student', component: StudentsListComponent },
      { path: 'teacher', component: TeachersListComponent },
      // { path: 'reports', component: ReportsComponent },
      // { path: 'reports', component: ReportsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
