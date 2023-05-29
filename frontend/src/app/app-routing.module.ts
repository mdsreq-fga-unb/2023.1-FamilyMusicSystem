import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from 'src/app/modules/main/main.component';
import { StudentsListComponent } from 'src/app/modules/student/students-list/students-list.component';
import { TeachersListComponent } from 'src/app/modules/teacher/teachers-list/teachers-list.component';
import { HomeComponent } from './modules/home/home.component';
import { MuralComponent } from './modules/mural/mural.component';
import { ScheduleComponent } from './modules/schedule/schedule.component';
import { RoomsListComponent } from './modules/rooms/rooms-list/rooms-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'students', component: StudentsListComponent },
      { path: 'teachers', component: TeachersListComponent },
      { path: 'mural', component: MuralComponent },
      { path: 'rooms', component: RoomsListComponent },
      { path: 'schedule', component: ScheduleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
