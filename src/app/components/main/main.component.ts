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
    goalEditorShowing: boolean = false;
    settingsShowing: boolean = false;
    confirmModalShowing: boolean = false;

    confirmModalMessage: string = 'Are you sure?';
    confirmModalButtonText: string = 'Confirm';
    confirmModalActionKey: string = '';
    confirmModalContext: any = {};

    goalEditorAmount: number = 0;
    goalEditorName: string = '';

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
        if (todaysMeals.length > 0) {
            this.mealExists = true;
        }
        
        this.todaysMeals = {
            date: today.toDateString(),
            meals: todaysMeals
        }

        let goalInfo = this.storageService.getTodaysGoals(today.toDateString());
        if (!goalInfo) {
            goalInfo = this.storageService.getTodaysDefaultGoals();
        }

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
        this.closeAllModals();
    }

    addFood(food: Food) {
        let lastMealIndex = this.todaysMeals.meals.length - 1;
        this.todaysMeals.meals[lastMealIndex].food.push(food);

        this.closeAllModals();
        this.updateRemaining();

        this.store();

        console.log(this.todaysMeals)
    }

    closeAllModals() {
        this.adderModalShowing = false;
        this.adderChooserShowing = false;
        this.adderFoodShowing = false;
        this.goalEditorShowing = false;
        this.settingsShowing = false;
        this.confirmModalShowing = false;
    }

    displayAdderModal() {
        this.closeAllModals()
        this.adderModalShowing = true;
    }

    displayAdderChooser() {
        this.adderChooserShowing = true;
    }

    displayFood() {
        this.closeAllModals()
        this.adderFoodShowing = true;
    }

    editCalories() {
        this.goalEditorAmount = this.caloriesGoal;
        this.goalEditorName = 'Calories';
        this.goalEditorShowing = true;
    }

    editCarbs() {
        this.goalEditorAmount = this.carbsGoal;
        this.goalEditorName = 'Carbs';
        this.goalEditorShowing = true;
    }

    editProtein() {
        this.goalEditorAmount = this.proteinGoal;
        this.goalEditorName = 'Protein';
        this.goalEditorShowing = true;
    }

    updateGoal(goalInfo: any) {
        switch(goalInfo.goalName) {
            case 'Calories':
                this.caloriesGoal = goalInfo.goal;
                break;
            case 'Carbs':
                this.carbsGoal = goalInfo.goal;
                break;
            case 'Protein':
                this.proteinGoal = goalInfo.goal;
                break;                        
        }
        this.updateRemaining();
        this.store();
        this.closeAllModals();
    }

    openSettings() {
        this.settingsShowing = true;
    }

    removeMeal(mealIndex: number) {
        this.confirmModalButtonText = 'Remove';
        this.confirmModalMessage = 'Are you sure you want to remove this food?';
        this.confirmModalActionKey = 'removeMeal';
        this.confirmModalContext = mealIndex;
        this.confirmModalShowing = true;
    }

    removeFood(foodInfo: { mealIndex: number, foodIndex: number }) {
        this.confirmModalButtonText = 'Remove';
        this.confirmModalMessage = 'Are you sure you want to remove this meal?';
        this.confirmModalActionKey = 'removeFood';
        this.confirmModalContext = foodInfo;
        this.confirmModalShowing = true;
    }

    confirmClicked(eventInfo: {context: any, actionKey: string}) {
        switch(eventInfo.actionKey) {
            case 'removeMeal':
                this.todaysMeals.meals.splice(eventInfo.context, 1);
                break;
            case 'removeFood':
                this.todaysMeals.meals[eventInfo.context.mealIndex].food.splice(eventInfo.context.foodIndex, 1);
                break;
        }
        this.updateRemaining();
        this.store();
        this.closeAllModals();
    }
}
