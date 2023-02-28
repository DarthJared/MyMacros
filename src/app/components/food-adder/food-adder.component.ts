import { Component, EventEmitter, Output } from '@angular/core';

type Food = {
    name: string
    servingSize: string
    calories: number
    carbs: number
    protein: number
}

@Component({
  selector: 'food-adder',
  templateUrl: './food-adder.component.html',
  styleUrls: ['./food-adder.component.css']
})
export class FoodAdderComponent {
    @Output() close = new EventEmitter<string>();
    @Output() food = new EventEmitter<Food>();

    name: string = '';
    servingSize: string = '';
    calories: number = 0;
    carbs: number = 0;
    protein: number = 0;

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }

    addFood() {
        this.food.emit({
            name: this.name,
            servingSize: this.servingSize,
            calories: this.calories,
            carbs: this.carbs,
            protein: this.protein
        });
    }
}