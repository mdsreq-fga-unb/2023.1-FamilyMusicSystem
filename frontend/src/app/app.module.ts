import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './modules/main/main.component';
import { StudentsRegisterComponent } from './modules/student/students-register/students-register.component';
import { StudentsListComponent } from './modules/student/students-list/students-list.component';
import { TeachersListComponent } from './modules/teacher/teachers-list/teachers-list.component';
import { TeachersRegisterComponent } from './modules/teacher/teachers-register/teachers-register.component';
import { HomeComponent } from './modules/home/home.component';
import { MuralComponent } from './modules/mural/mural.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsViewComponent } from './modules/student/students-view/students-view.component';
import { TeachersViewComponent } from './modules/teacher/teachers-view/teachers-view.component';
import { StudentsFilterComponent } from './modules/student/students-filter/students-filter.component';
import { TeachersFilterComponent } from './modules/teacher/teachers-filter/teachers-filter.component';
import { RoomListComponent } from './modules/room/room-list/room-list.component';
import { RoomRegisterComponent } from './modules/room/room-register/room-register.component';
import { RoomFilterComponent } from './modules/room/room-filter/room-filter.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PrivacyComponent } from './modules/settings/privacy/privacy.component';
import { AboutComponent } from './modules/settings/about/about.component';
import { ResourcesComponent } from './modules/settings/resources/resources.component';
import { ContractComponent } from './modules/settings/contract/contract.component';
import { HelpComponent } from './modules/settings/help/help.component';
import { ScheduleListComponent } from './modules/schedule/schedule-list/schedule-list.component';
import { ScheduleRegisterComponent } from './modules/schedule/schedule-register/schedule-register.component';
import { ScheduleViewComponent } from './modules/schedule/schedule-view/schedule-view.component';
import { ScheduleFilterComponent } from './modules/schedule/schedule-filter/schedule-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentsAlertComponent } from './modules/student/students-alert/students-alert.component';
import { CookieService } from './service/cookie.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    StudentsListComponent,
    StudentsRegisterComponent,
    TeachersListComponent,
    TeachersRegisterComponent,
    MuralComponent,
    StudentsViewComponent,
    TeachersViewComponent,
    StudentsFilterComponent,
    TeachersFilterComponent,
    RoomListComponent,
    RoomRegisterComponent,
    RoomFilterComponent,
    PrivacyComponent,
    AboutComponent,
    ResourcesComponent,
    ContractComponent,
    HelpComponent,
    ScheduleListComponent,
    ScheduleRegisterComponent,
    ScheduleViewComponent,
    ScheduleFilterComponent,
    HomeComponent,
    StudentsAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
  ],
  providers: [BsModalService, CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
