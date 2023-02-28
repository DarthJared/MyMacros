import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'adder-chooser',
  templateUrl: './adder-chooser.component.html',
  styleUrls: ['./adder-chooser.component.css']
})
export class AdderChooserComponent {
    @Input() mealExists = false;
    @Output() close = new EventEmitter<string>();
    @Output() meal = new EventEmitter<string>();
    @Output() food = new EventEmitter<string>();

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }

    startMeal() {
        this.meal.emit('new meal');
    }

    addFood() {
        this.food.emit('add food');
    }
}