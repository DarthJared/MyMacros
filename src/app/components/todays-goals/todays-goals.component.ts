import { Component, EventEmitter, Input, Output } from '@angular/core';

type Goals = {
  calories: number
  carbs: number
  protein: number
}

@Component({
  selector: 'todays-goals',
  templateUrl: './todays-goals.component.html',
  styleUrls: ['./todays-goals.component.css']
})
export class TodaysGoalsComponent {
  @Output() goals = new EventEmitter<Goals>();
  
  @Input('calories') caloriesGoal = 0;
  @Input('carbs') carbsGoal = 0;
  @Input('protein') proteinGoal = 0;

  updateGoals() {
    this.goals.emit({
      calories: this.caloriesGoal,
      carbs: this.carbsGoal,
      protein: this.proteinGoal
    })
  }
}
