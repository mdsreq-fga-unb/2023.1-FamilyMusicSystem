import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppTeste } from './app.teste';

@NgModule({
  declarations: [AppTeste],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppTeste],
})
export class AppModule {}
