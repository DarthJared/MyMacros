import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'today-food',
  templateUrl: './today-food.component.html',
  styleUrls: ['./today-food.component.css']
})
export class TodayFoodComponent {
    @Input() food: any = null;
    @Output() removeMeal = new EventEmitter<number>();
    @Output() removeFood = new EventEmitter<{mealIndex: number, foodIndex: number}>();
    expandedIndexes: any = {}

    showOpened(mealIndex: number, foodIndex: number) {
        if (this.expandedIndexes[mealIndex]?.includes(foodIndex)) {
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
}
