import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./modules/login/login.component";
import { SidebarComponent } from "./template/sidebar/sidebar.component";
import { FooterComponent } from "./template/footer/footer.component";
import { HeaderComponent } from "./template/header/header.component";
import { MatIconModule } from "@angular/material/icon";
import { MainComponent } from "./modules/main/main.component";
import { StudentsRegisterComponent } from "./modules/student/students-register/students-register.component";
import { StudentsListComponent } from "./modules/student/students-list/students-list.component";
import { TeachersListComponent } from "./modules/teacher/teachers-list/teachers-list.component";
import { TeachersRegisterComponent } from "./modules/teacher/teachers-register/teachers-register.component";
import { HomeComponent } from "./modules/home/home.component";
import { BsModalService } from "ngx-bootstrap/modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StudentsViewComponent } from "./modules/student/students-view/students-view.component";
import { TeachersViewComponent } from "./modules/teacher/teachers-view/teachers-view.component";
import { StudentsFilterComponent } from "./modules/student/students-filter/students-filter.component";
import { TeachersFilterComponent } from "./modules/teacher/teachers-filter/teachers-filter.component";
import { RoomListComponent } from "./modules/room/room-list/room-list.component";
import { RoomRegisterComponent } from "./modules/room/room-register/room-register.component";
import { RoomFilterComponent } from "./modules/room/room-filter/room-filter.component";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AboutComponent } from "./modules/settings/about/about.component";
import { ResourcesComponent } from "./modules/settings/resources/resources.component";
import { ContractComponent } from "./modules/settings/contract/contract.component";
import { HelpComponent } from "./modules/settings/help/help.component";
import { ScheduleListComponent } from "./modules/schedule/schedule-list/schedule-list.component";
import { ScheduleRegisterComponent } from "./modules/schedule/schedule-register/schedule-register.component";
import { ScheduleViewComponent } from "./modules/schedule/schedule-view/schedule-view.component";
import { ScheduleFilterComponent } from "./modules/schedule/schedule-filter/schedule-filter.component";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "./services/cookie.service";
import { AlertModule } from "ngx-bootstrap/alert";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmationComponent } from "./shared/confirmation/confirmation.component";
import { AlertComponent } from "./shared/alert/alert.component";
import { ExpiredComponent } from "./shared/expired/expired.component";
import { RoomViewComponent } from "./modules/room/room-view/room-view.component";
import { PreloaderComponent } from "./modules/preloader/preloader.component";
import { KzMaskDirective } from "./kz-mask.directive";
import { DataSharingService } from "./services/data-sharing.service";
import { CurrencyPipe } from "@angular/common";
import { FormControl } from "@angular/forms";
import { MuralListComponent } from "./modules/mural/mural-list/mural-list.component";
import { MuralRegisterComponent } from "./modules/mural/mural-register/mural-register.component";
import { MuralFilterComponent } from "./modules/mural/mural-filter/mural-filter.component";
import { MuralViewComponent } from "./modules/mural/mural-view/mural-view.component";
import { ForgotPasswordComponent } from "./modules/login/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./modules/reset-password/reset-password.component";

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ConfirmationComponent,
    AlertComponent,
    ExpiredComponent,
    ContractComponent,
    FooterComponent,
    HeaderComponent,
    HelpComponent,
    HomeComponent,
    KzMaskDirective,
    LoginComponent,
    MainComponent,
    PreloaderComponent,
    ResourcesComponent,
    RoomFilterComponent,
    RoomListComponent,
    RoomRegisterComponent,
    RoomViewComponent,
    ScheduleFilterComponent,
    ScheduleListComponent,
    ScheduleRegisterComponent,
    ScheduleViewComponent,
    SidebarComponent,
    StudentsFilterComponent,
    StudentsListComponent,
    StudentsRegisterComponent,
    StudentsViewComponent,
    TeachersFilterComponent,
    TeachersListComponent,
    TeachersRegisterComponent,
    TeachersViewComponent,
    MuralListComponent,
    MuralRegisterComponent,
    MuralFilterComponent,
    MuralViewComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AlertModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [
    BsModalService,
    CookieService,
    DataSharingService,
    CurrencyPipe,
    FormControl,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
