import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { AdderModalComponent } from './components/adder-modal/adder-modal.component';
import { MainComponent } from './components/main/main.component';
import { RemainingComponent } from './components/remaining/remaining.component';
import { TodaysGoalsComponent } from './components/todays-goals/todays-goals.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddButtonComponent,
    AdderModalComponent,
    TodaysGoalsComponent,
    RemainingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
