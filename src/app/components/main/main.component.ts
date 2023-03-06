import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

type Food = {
    name: string
    servingSize: string
    calories: number
    carbs: number
    protein: number
}

type Consumption = {
    id: number
    quantity: number
}

type Meal = {
    name: string
    food: Consumption[]
}

type DaysMeals = {
    date: string
    meals: Meal[]
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

type StoredFoodCatalogue = {
    [id: number]: StorableFood
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
    daysMeals: DaysMeals = {
        date: '01-01-1900',
        meals: []
    };
    mealExists: boolean = false;

    storedFoods: StoredFoodCatalogue = {};

    observedDay: string;

    caloriesGoal: number = 0;
    carbsGoal: number = 0;
    proteinGoal: number = 0;
    caloriesLeft: number = 0;
    carbsLeft: number = 0;
    proteinLeft: number = 0;
    
    constructor(private storageService: StorageService) {
        this.loadStoredFoods();

        let today = new Date();
        this.observedDay = today.toDateString();

        this.loadMeals();
        this.updateDaysGoals();
        this.updateRemaining();
    }

    loadMeals() {
        let todaysMeals = this.storageService.getDaysMeals(this.observedDay)
        if (todaysMeals.length > 0) {
            this.mealExists = true;
        }
        
        this.daysMeals = {
            date: this.observedDay,
            meals: todaysMeals
        }
    }

    updateDaysGoals() {
        let goalInfo = this.storageService.getDaysGoals(this.observedDay);
        if (!goalInfo) {
            goalInfo = this.storageService.getDefaultGoals(this.observedDay);
        }

        this.caloriesGoal = goalInfo.calories;
        this.carbsGoal = goalInfo.carbs;
        this.proteinGoal = goalInfo.protein;
    }

    loadStoredFoods() {
        this.storedFoods = this.storageService.getSavedFoods() ?? {};
    }

    store() {
        this.storageService.saveMeals(this.daysMeals);
        this.storageService.saveGoals({
            date: this.daysMeals.date,
            calories: this.caloriesGoal,
            carbs: this.carbsGoal,
            protein: this.proteinGoal
        });
    }

    updateRemaining() {
        let caloriesLeft = this.caloriesGoal;
        let carbsLeft = this.carbsGoal;
        let proteinLeft = this.proteinGoal;

        for (const meal of this.daysMeals.meals) {
            for (const food of meal.food) {
                const foodInfo = this.storedFoods[food.id];
                const servingPortion = (food.quantity / foodInfo.servingSize);

                caloriesLeft -= foodInfo.caloriesPerServing * servingPortion;
                carbsLeft -= foodInfo.carbsPerServing * servingPortion;
                proteinLeft -= foodInfo.proteinPerServing * servingPortion;
            }
        }

        this.caloriesLeft = caloriesLeft;
        this.carbsLeft = carbsLeft;
        this.proteinLeft = proteinLeft;
    }

    updateGoals(goals: any) {
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

        this.daysMeals.meals.push(newMeal)
        this.mealExists = true;
        this.closeAllModals();
    }

    addFood(foodInfo: Consumption) {
        let lastMealIndex = this.daysMeals.meals.length - 1;
        this.daysMeals.meals[lastMealIndex].food.push(foodInfo);

        this.closeAllModals();
        this.updateRemaining();

        this.store();
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
        this.confirmModalMessage = 'Are you sure you want to remove this meal?';
        this.confirmModalActionKey = 'removeMeal';
        this.confirmModalContext = mealIndex;
        this.confirmModalShowing = true;
    }

    removeFood(foodInfo: { mealIndex: number, foodIndex: number }) {
        this.confirmModalButtonText = 'Remove';
        this.confirmModalMessage = 'Are you sure you want to remove this food?';
        this.confirmModalActionKey = 'removeFood';
        this.confirmModalContext = foodInfo;
        this.confirmModalShowing = true;
    }

    confirmClicked(eventInfo: {context: any, actionKey: string}) {
        switch(eventInfo.actionKey) {
            case 'removeMeal':
                this.daysMeals.meals.splice(eventInfo.context, 1);
                break;
            case 'removeFood':
                this.daysMeals.meals[eventInfo.context.mealIndex].food.splice(eventInfo.context.foodIndex, 1);
                break;
        }
        this.updateRemaining();
        this.store();
        this.closeAllModals();
    }

    storeNewFood(newFood: any) {
        this.storageService.storeNewFood(newFood);
        this.loadStoredFoods();
    }

    updateDate(date: Date) {
        console.log(date)
        this.observedDay = date.toDateString();
        this.loadMeals();
        this.updateDaysGoals();
        this.updateRemaining();
    }
}
