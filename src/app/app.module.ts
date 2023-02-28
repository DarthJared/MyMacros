import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { AdderChooserComponent } from './components/adder-chooser/adder-chooser.component';
import { AdderModalComponent } from './components/adder-modal/adder-modal.component';
import { FoodAdderComponent } from './components/food-adder/food-adder.component';
import { MainComponent } from './components/main/main.component';
import { RemainingComponent } from './components/remaining/remaining.component';
import { TodayFoodComponent } from './components/today-food/today-food.component';
import { TodaysGoalsComponent } from './components/todays-goals/todays-goals.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddButtonComponent,
    AdderModalComponent,
    TodaysGoalsComponent,
    RemainingComponent,
    AdderChooserComponent,
    FoodAdderComponent,
    TodayFoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
