import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from 'src/app/modules/main/main.component';
import { StudentsListComponent } from 'src/app/modules/student/students-list/students-list.component';
import { TeachersListComponent } from 'src/app/modules/teacher/teachers-list/teachers-list.component';
import { HomeComponent } from './modules/home/home.component';
import { MuralComponent } from './modules/mural/mural.component';
import { ScheduleListComponent } from 'src/app/modules/schedule/schedule-list/schedule-list.component';
import { RoomListComponent } from './modules/room/room-list/room-list.component';

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
      { path: 'rooms', component: RoomListComponent },
      { path: 'schedule', component: ScheduleListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
