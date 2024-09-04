import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

type StorableFood = {
    id: number
    name: string
    servingSize: number
    servingUnits: string
    caloriesPerServing: number
    carbsPerServing: number
    fatPerServing: number
    proteinPerServing: number
}

type MacroSelection = {
    calories: boolean
    carbs: boolean
    fat: boolean
    protein: boolean
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
    @Output() updateFoods = new EventEmitter<{ [id: number]: StorableFood }>();

    _existingFoods: { [id: number]: StorableFood } = {};
    get existingFoods() {
      return this._existingFoods;
    }
    @Input() set existingFoods (foodsVal: { [id: number]: StorableFood }) {
      this._existingFoods = foodsVal;
      this.updateFoodsList();
    }

    filteredFoods: { [id: number]: StorableFood } = {};
    @Input() activeMacros: MacroSelection = {
        calories: true,
        carbs: true,
        fat: false,
        protein: true
    };

    newFoodShowing: boolean = false;
    selectedFoodId: number = 0;
    selectedFoodQuantity: number = 0;

    foodEditing: boolean = false;

    oldFoods: { [id: number]: StorableFood } = {};

    name: string = '';
    servingSize: number = 0;
    servingSizeUnits: string = 'g';
    calories: number = 0;
    carbs: number = 0;
    fat: number = 0;
    protein: number = 0;

    foodSearch: string = '';
    showFoodSearch: boolean = false;

    constructor() {
      this.updateFoodsList();
    }

    updateFoodsList() {
        this.filteredFoods = {};

        for (let foodId in this.existingFoods) {
            if (this.existingFoods[foodId].name.toLowerCase().includes(this.foodSearch.toLowerCase())) {
                this.filteredFoods[foodId] = this.existingFoods[foodId];
            }
        }
    }

    closeModal() {
        if (!this.foodEditing) {
            this.close.emit('close');
        }
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
            fatPerServing: this.fat,
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
        if (this.foodEditing || this.selectedFoodId == id) {
            this.selectedFoodId = 0;
        }
        else {
            this.selectedFoodQuantity = this.existingFoods[id].servingSize;
            this.selectedFoodId = id;
        }
    }

    quantityChanged(event: any) {
        this.selectedFoodQuantity = event.target.valueAsNumber;
    }

    editFoods() {
        this.oldFoods = JSON.parse(JSON.stringify(this.existingFoods));
        this.newFoodShowing = false;
        this.selectedFoodId = 0;
        this.foodEditing = true;
    }

    toggleSearchFoods() {
      this.showFoodSearch = !this.showFoodSearch;
      this.foodSearch = '';
    }

    saveFoodEdits() {
        this.updateFoods.emit(this.existingFoods);
        this.foodEditing = false;
    }

    deleteFood(foodId: number) {
        delete this.existingFoods[foodId];
        this.updateFoods.emit(this.existingFoods);
    }

    cancelEditing() {
        this.existingFoods = this.oldFoods;
        this.saveFoodEdits();
    }
}
