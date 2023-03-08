import { Component, EventEmitter, Input, Output } from '@angular/core';

type MacroSelection = {
    calories: boolean
    carbs: boolean
    fat: boolean
    protein: boolean
}

@Component({
  selector: 'today-food',
  templateUrl: './today-food.component.html',
  styleUrls: ['./today-food.component.css']
})
export class TodayFoodComponent {
    @Input() food: any = null;
    @Input() existingFood: any = null;
    @Input() activeMacros: MacroSelection = {
        calories: true,
        carbs: true,
        fat: false,
        protein: true
    };
    @Output() removeMeal = new EventEmitter<number>();
    @Output() removeFood = new EventEmitter<{mealIndex: number, foodIndex: number}>();
    @Output() updateFood = new EventEmitter<any>();
    @Output() addFoodToMeal = new EventEmitter<number>();
    expandedIndexes: any = {};
    editingIndex: any = {
        mealIndex: -1,
        foodIndex: -1
    };

    showOpened(mealIndex: number, foodIndex: number) {
        if (this.expandedIndexes[mealIndex]?.includes(foodIndex)) {
            return true;
        }
        return false;
    }

    showEditing(mealIndex: number, foodIndex: number) {
        if (this.editingIndex.mealIndex == mealIndex && this.editingIndex.foodIndex == foodIndex) {
            return true;
        }
        return false;
    }

    toggleOpened(mealIndex: number, foodIndex: number) {
        if (this.showOpened(mealIndex, foodIndex)) {
            this.closeFood(mealIndex, foodIndex);
        }
        else {
            this.openFood(mealIndex, foodIndex);
        }
    }

    setEditing(mealIndex: number, foodIndex: number, event: any) {
        this.editingIndex.mealIndex = mealIndex;
        this.editingIndex.foodIndex = foodIndex;
        this.expandedIndexes = {};
        
        event.stopPropagation();
    }

    closeEditing(event: any) {
        this.setEditing(-1, -1, event);

        event.stopPropagation();
    }

    openFood(mealIndex: number, foodIndex: number) {
        if (!this.expandedIndexes[mealIndex]) {
            this.expandedIndexes[mealIndex] = [foodIndex]
        }
        else {
            this.expandedIndexes[mealIndex].push(foodIndex)
        }
    }

    closeFood(mealIndex: number, foodIndex: number) {
        let openedFoods = this.expandedIndexes[mealIndex].filter((foodInd: number) => {
            return foodInd != foodIndex;
        });
        this.expandedIndexes[mealIndex] = openedFoods;
    }

    deleteMeal(mealIndex: number) {
        this.removeMeal.emit(mealIndex);
    }

    deleteFood(mealIndex: number, foodIndex: number) {
        this.removeFood.emit({ mealIndex, foodIndex });
    }

    saveEdit(event: any) {
        this.updateFood.emit(this.food);
        this.closeEditing(event);
        event.stopPropagation();
    }

    addFood(mealIndex: number, event: any) {
        this.addFoodToMeal.emit(mealIndex);
        this.doNothing(event);
    }

    doNothing(event: any) {
        event.stopPropagation();
    }
}
