import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './modules/main/main.component';
import { StudentsRegisterComponent } from './modules/student/students-register/students-register.component';
import { StudentsListComponent } from 'src/app/modules/student/students-list/students-list.component';
import { TeachersListComponent } from './modules/teacher/teachers-list/teachers-list.component';
import { TeachersRegisterComponent } from './modules/teacher/teachers-register/teachers-register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    MainComponent,
    StudentsListComponent,
    StudentsRegisterComponent,
    TeachersListComponent,
    TeachersRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
