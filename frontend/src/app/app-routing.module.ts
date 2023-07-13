import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent } from './modules/main/main.component';
import { StudentsListComponent } from './modules/student/students-list/students-list.component';
import { TeachersListComponent } from './modules/teacher/teachers-list/teachers-list.component';
import { HomeComponent } from './modules/home/home.component';
import { ScheduleListComponent } from './modules/schedule/schedule-list/schedule-list.component';
import { RoomListComponent } from './modules/room/room-list/room-list.component';
import { AuthGuard } from './modules/login/auth.guard';
import { MuralListComponent } from './modules/mural/mural-list/mural-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'students', component: StudentsListComponent },
      { path: 'teachers', component: TeachersListComponent },
      { path: 'mural', component: MuralListComponent },
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
