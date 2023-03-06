import { Component, EventEmitter, Input, Output } from '@angular/core';

type Food = {
    name: string
    servingSize: number
    servingUnits: string
    caloriesPerServing: number
    carbsPerServing: number
    proteinPerServing: number
}

type StorableFood = {
    id: number
    name: string
    servingSize: number
    servingUnits: string
    caloriesPerServing: number
    carbsPerServing: number
    proteinPerServing: number
  }

@Component({
  selector: 'food-adder',
  templateUrl: './food-adder.component.html',
  styleUrls: ['./food-adder.component.css']
})
export class FoodAdderComponent {
    @Output() close = new EventEmitter<string>();
    @Output() food = new EventEmitter<{ id: number, quantity: number }>();
    @Output() store = new EventEmitter<StorableFood>();

    @Input() existingFoods: { [id: number]: StorableFood } = {};

    newFoodShowing: boolean = false;
    selectedFoodId: number = 0;
    selectedFoodQuantity: number = 0;

    name: string = '';
    servingSize: number = 0;
    servingSizeUnits: string = 'g';
    calories: number = 0;
    carbs: number = 0;
    protein: number = 0;



    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }

    storeFood() {
        let maxId = 0;

        for (let foodId in this.existingFoods) {
            if (parseInt(foodId) > maxId) {
                maxId = parseInt(foodId);
            }
        }

        this.store.emit({
            id: maxId + 1,
            name: this.name,
            servingSize: this.servingSize,
            servingUnits: this.servingSizeUnits,
            caloriesPerServing: this.calories,
            carbsPerServing: this.carbs,
            proteinPerServing: this.protein
        });

        this.newFoodShowing = false;
    }

    newFoodClicked() {
        this.newFoodShowing = true;
    }

    cancelNewFood() {
        this.newFoodShowing = false;
    }

    addFood(id: any) {
        this.food.emit({ id, quantity: this.selectedFoodQuantity });
    }

    foodClicked(id: any) {
        if (this.selectedFoodId == id) {
            this.selectedFoodId = 0;
        }
        else {
            this.selectedFoodQuantity = this.existingFoods[id].servingSize;
            this.selectedFoodId = id;
        }
    }

    quantityChanged(event: any) {
        this.selectedFoodQuantity = event.target.valueAsNumber;
        console.log(this.selectedFoodQuantity)
    }
}