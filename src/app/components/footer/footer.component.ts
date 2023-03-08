import { Component, EventEmitter, Input, Output } from '@angular/core';

type MacroSelection = {
    calories: boolean
    carbs: boolean
    fat: boolean
    protein: boolean
}

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() caloriesGoal: number = 0;
  @Input() carbsGoal: number = 0;
  @Input() fatGoal: number = 0;
  @Input() proteinGoal: number = 0;
  @Input() caloriesRemaining: number = 0;
  @Input() carbsRemaining: number = 0;
  @Input() fatRemaining: number = 0;
  @Input() proteinRemaining: number = 0;
  @Input() activeMacros: MacroSelection = {
      calories: true,
      carbs: true,
      fat: false,
      protein: true
  };
  @Output() calories = new EventEmitter<string>();
  @Output() carbs = new EventEmitter<string>();
  @Output() fat = new EventEmitter<string>();
  @Output() protein = new EventEmitter<string>();

  caloriesClicked() {
    this.calories.emit('calories');
  }

  carbsClicked() {
    this.carbs.emit('carbs');
  }

  fatClicked() {
    this.fat.emit('fat');
  }

  proteinClicked() {
    this.protein.emit('protein');
  }

  buttonWidthPercent() {
    let numActive = 0;
    if (this.activeMacros.calories) {
        numActive++; 
    }
    if (this.activeMacros.carbs) {
        numActive++; 
    }
    if (this.activeMacros.fat) {
        numActive++; 
    }
    if (this.activeMacros.protein) {
        numActive++; 
    }
    return 100 / numActive - 1;
  }
}