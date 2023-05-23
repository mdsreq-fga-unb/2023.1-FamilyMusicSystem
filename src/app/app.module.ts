import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroAlunosComponent } from './modules/cadastro-alunos/cadastro-alunos.component';
import { LoginComponentComponent } from './modules/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroAlunosComponent,
    LoginComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
