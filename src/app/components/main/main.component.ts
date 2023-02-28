import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

type Food = {
    name: string
    servingSize: string
    calories: number
    carbs: number
    protein: number
}

type Meal = {
    name: string
    food: Food[]
}

type DaysMeals = {
    date: string
    meals: Meal[]
}

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
    adderModalShowing: boolean = false;
    adderChooserShowing: boolean = false;
    adderFoodShowing: boolean = false;
    currentMeal: string = '';
    todaysMeals: DaysMeals;
    mealExists: boolean = false;

    caloriesGoal: number;
    carbsGoal: number;
    proteinGoal: number;
    caloriesLeft: number = 0;
    carbsLeft: number = 0;
    proteinLeft: number = 0;
    
    constructor(private storageService: StorageService) {
        let today = new Date();

        let todaysMeals = this.storageService.getTodaysMeals(today.toDateString())
        
        this.todaysMeals = {
            date: today.toDateString(),
            meals: todaysMeals
        }

        let goalInfo = this.storageService.getTodaysGoals(today.toDateString());

        this.caloriesGoal = goalInfo.calories;
        this.carbsGoal = goalInfo.carbs;
        this.proteinGoal = goalInfo.protein;

        this.updateRemaining();
    }

    store() {
        this.storageService.saveMeals(this.todaysMeals);
        this.storageService.saveGoals({
            date: this.todaysMeals.date,
            calories: this.caloriesGoal,
            carbs: this.carbsGoal,
            protein: this.proteinGoal
        });
    }

    updateRemaining() {
        let caloriesLeft = this.caloriesGoal;
        let carbsLeft = this.carbsGoal;
        let proteinLeft = this.proteinGoal;

        for (const meal of this.todaysMeals.meals) {
            for (const food of meal.food) {
                caloriesLeft -= food.calories;
                carbsLeft -= food.carbs;
                proteinLeft -= food.protein;
            }
        }

        this.caloriesLeft = caloriesLeft;
        this.carbsLeft = carbsLeft;
        this.proteinLeft = proteinLeft;
    }

    updateGoals(goals: any) {
        console.log(goals)
        this.caloriesGoal = goals.calories;
        this.carbsGoal = goals.carbs;
        this.proteinGoal = goals.protein;

        this.updateRemaining();
        this.store()
    }

    startMeal(meal: string) {
        let newMeal: Meal = {
            name: meal,
            food: []
        };

        this.todaysMeals.meals.push(newMeal)
        this.mealExists = true;
        this.hideAdderModal();
    }

    addFood(food: Food) {
        let lastMealIndex = this.todaysMeals.meals.length - 1;
        this.todaysMeals.meals[lastMealIndex].food.push(food);

        this.hideFoodAdder();
        this.updateRemaining();

        this.store();

        console.log(this.todaysMeals)
    }

    displayAdderModal() {
        this.hideAdderChooser()
        this.adderModalShowing = true;
    }

    hideAdderModal() {
        this.adderModalShowing = false;
    }

    displayAdderChooser() {
        this.adderChooserShowing = true;
    }

    hideAdderChooser() {
        this.adderChooserShowing = false;
    }

    displayFood() {
        this.hideAdderChooser()
        this.adderFoodShowing = true;
    }

    hideFoodAdder() {
        this.adderFoodShowing = false;
    }
}
