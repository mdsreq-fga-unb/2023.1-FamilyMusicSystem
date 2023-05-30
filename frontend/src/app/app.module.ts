import { NgModule } from '@angular/core';
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
import { StudentsListComponent } from 'src/app/modules/student/students-list/students-list.component';
import { TeachersListComponent } from './modules/teacher/teachers-list/teachers-list.component';
import { TeachersRegisterComponent } from './modules/teacher/teachers-register/teachers-register.component';
import { HomeComponent } from './modules/home/home.component';
import { MuralComponent } from './modules/mural/mural.component';
import { ScheduleComponent } from './modules/schedule/schedule.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsViewComponent } from './modules/student/students-view/students-view.component';
import { TeachersViewComponent } from './modules/teacher/teachers-view/teachers-view.component';
import { StudentsFilterComponent } from './modules/student/students-filter/students-filter.component';
import { TeachersFilterComponent } from './modules/teacher/teachers-filter/teachers-filter.component';
import { HelpModalComponent } from './shared/help-modal/help-modal.component';
import { StudentsContractComponent } from './modules/student/students-contract/students-contract.component';
import { RoomsListComponent } from './modules/rooms/rooms-list/rooms-list.component';
import { RoomsRegisterComponent } from './modules/rooms/rooms-register/rooms-register.component';
import { RoomsFilterComponent } from './modules/rooms/rooms-filter/rooms-filter.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PrivacyComponent } from './modules/settings/privacy/privacy.component';
import { AboutComponent } from './modules/settings/about/about.component';
import { ResourcesComponent } from './modules/settings/resources/resources.component';
import { ContractComponent } from './modules/settings/contract/contract.component';

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
    HomeComponent,
    MuralComponent,
    ScheduleComponent,
    StudentsViewComponent,
    TeachersViewComponent,
    StudentsFilterComponent,
    TeachersFilterComponent,
    HelpModalComponent,
    StudentsContractComponent,
    RoomsListComponent,
    RoomsRegisterComponent,
    RoomsFilterComponent,
    PrivacyComponent,
    AboutComponent,
    ResourcesComponent,
    ContractComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
