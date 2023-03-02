import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() caloriesGoal: number = 0;
  @Input() carbsGoal: number = 0;
  @Input() proteinGoal: number = 0;
  @Input() caloriesRemaining: number = 0;
  @Input() carbsRemaining: number = 0;
  @Input() proteinRemaining: number = 0;
  @Output() calories = new EventEmitter<string>();
  @Output() carbs = new EventEmitter<string>();
  @Output() protein = new EventEmitter<string>();

  caloriesClicked() {
    this.calories.emit('calories');
  }

  carbsClicked() {
    this.carbs.emit('carbs');
  }

  proteinClicked() {
    this.protein.emit('protein');
  }
}