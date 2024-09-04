import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import {forkJoin} from "rxjs";

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
    fatPerServing: number
    proteinPerServing: number
}

type StoredFoodCatalogue = {
    [id: number]: StorableFood
}

type MacroSelection = {
    calories: boolean
    carbs: boolean
    fat: boolean
    protein: boolean
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

    foodAdderMealIndex: number = -1;

    storedFoods: StoredFoodCatalogue = {};

    observedDay: string;

    caloriesGoal: number = 0;
    carbsGoal: number = 0;
    fatGoal: number = 0;
    proteinGoal: number = 0;
    caloriesLeft: number = 0;
    carbsLeft: number = 0;
    fatLeft: number = 0;
    proteinLeft: number = 0;

    activeMacros: MacroSelection = {
        calories: true,
        carbs: true,
        fat: false,
        protein: true
    };

    constructor(private storageService: StorageService) {
        this.loadStoredFoods();

        let today = new Date();
        this.observedDay = today.toDateString();

        this.loadMeals();
        this.loadActiveMacros();
        this.updateDaysGoals();
        this.updateRemaining();
    }

    loadActiveMacros() {
        this.storageService.getMacros().subscribe((loadedMacros) => {
          if (loadedMacros) {
            this.activeMacros = loadedMacros;
          } else {
            this.activeMacros = {
              calories: true,
              carbs: true,
              fat: false,
              protein: true
            };
          }
        });
    }

    loadMeals() {
        this.storageService.getDaysMeals(this.observedDay).subscribe((todaysMeals) => {
          this.daysMeals = {
            date: this.observedDay,
            meals: todaysMeals
          }

          this.updateDaysGoals();
        });
    }

    updateDaysGoals() {
      const daysGoals = this.storageService.getDaysGoals(this.observedDay);
      const defaultGoals = this.storageService.getDefaultGoals(this.observedDay);
      forkJoin([daysGoals, defaultGoals]).subscribe(([daysGoals, defaultGoals]) => {
        this.caloriesGoal = daysGoals ? daysGoals.calories : defaultGoals.calories
        this.carbsGoal = daysGoals ? daysGoals.carbs : defaultGoals.carbs;
        this.fatGoal = daysGoals ? daysGoals.fat : defaultGoals.fat;
        this.proteinGoal = daysGoals ? daysGoals.protein : defaultGoals.protein;

        this.updateRemaining();
      });
    }

    loadStoredFoods() {
      this.storageService.getSavedFoods().subscribe((loadedFoods) => {
        this.storedFoods = loadedFoods ?? {};
      });
    }

    store() {
        this.storageService.saveMeals(this.daysMeals).subscribe();
        this.storageService.saveGoals({
            date: this.daysMeals.date,
            calories: this.caloriesGoal,
            carbs: this.carbsGoal,
            fat: this.fatGoal,
            protein: this.proteinGoal
        }).subscribe();
    }

    updateRemaining() {
        let caloriesLeft = this.caloriesGoal;
        let carbsLeft = this.carbsGoal;
        let fatLeft = this.fatGoal;
        let proteinLeft = this.proteinGoal;

        for (const meal of this.daysMeals.meals) {
            for (const food of meal.food) {
                const foodInfo = this.storedFoods[food.id];
                const servingPortion = (food.quantity / foodInfo.servingSize);

                caloriesLeft -= foodInfo.caloriesPerServing * servingPortion;
                carbsLeft -= foodInfo.carbsPerServing * servingPortion;
                fatLeft -= foodInfo.fatPerServing * servingPortion;
                proteinLeft -= foodInfo.proteinPerServing * servingPortion;
            }
        }

        this.caloriesLeft = caloriesLeft;
        this.carbsLeft = carbsLeft;
        this.fatLeft = fatLeft;
        this.proteinLeft = proteinLeft;
    }

    startMeal(meal: string) {
        let newMeal: Meal = {
            name: meal,
            food: []
        };

        this.daysMeals.meals.push(newMeal)
        this.closeAllModals();
    }

    addFood(foodInfo: Consumption) {
        this.daysMeals.meals[this.foodAdderMealIndex].food.push(foodInfo);

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

    displayFoodForMeal(mealIndex: number) {
        this.foodAdderMealIndex = mealIndex;
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

    editFat() {
        this.goalEditorAmount = this.fatGoal;
        this.goalEditorName = 'Fat';
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
            case 'Fat':
                this.fatGoal = goalInfo.goal;
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
      this.storageService.storeNewFood(newFood).subscribe(() => {
        this.loadStoredFoods();
      });
    }

    updateDate(date: Date) {
        this.observedDay = date.toDateString();
        this.loadMeals();
    }

    updateFood(updatedMeals: DaysMeals) {
        this.daysMeals = updatedMeals;
        this.store();
        this.updateRemaining();
    }

    updateFoods(foods: any) {
        this.storageService.updateFoods(foods).subscribe(() => {
          this.loadStoredFoods();
          this.updateRemaining();
        });
    }

    importData(importInfo: { type: string, value: any }) {
        switch(importInfo.type) {
            case 'macros':
                this.storageService.storeMacros(JSON.parse(importInfo.value)).subscribe();
                break;
            case 'goals':
                this.storageService.saveAllGoals(JSON.parse(importInfo.value)).subscribe();
                break;
            case 'meals':
                this.storageService.saveAllMeals(JSON.parse(importInfo.value)).subscribe();
                break;
            case 'weekGoals':
                this.storageService.saveWeekGoals(JSON.parse(importInfo.value)).subscribe();
                break;
            case 'foods':
                this.storageService.updateFoods(JSON.parse(importInfo.value)).subscribe();
                break;
        }

        this.loadStoredFoods();
        this.loadMeals();
        this.loadActiveMacros();
        this.updateDaysGoals();
        this.updateRemaining();

        this.closeAllModals();
    }
}
