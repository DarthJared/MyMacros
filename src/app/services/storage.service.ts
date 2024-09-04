import { Injectable } from '@angular/core';
import {CrudService} from "./crud.service";
import {map, mergeMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private crudService: CrudService) { }

  public saveMeals(meals: any) {
    return this.getMeals().pipe(
      mergeMap((allMealsData: any) => {
        let allMeals = allMealsData.items[0].meals;
        allMeals[meals.date] = meals.meals;
        return this.saveAllMeals(allMeals);
      })
    );
  }

  public saveAllMeals(meals: any) {
    return this.crudService.updateMeals(meals);
  }

  public getMeals() {
    return this.crudService.getMeals();
  }

  public getDaysMeals(date: string) {
    return this.getMeals().pipe(
      map((allMealsData: any) => {
        let allMeals = allMealsData.items[0].meals;
        if (allMeals) {
          let daysMeals = allMeals[date];
          if (daysMeals) {
            return daysMeals;
          }
        }
        return [];
      })
    );
  }

  public saveGoals(goals: any) {
    return this.getGoals().pipe(
      mergeMap((allGoalsData: any) => {
        let allGoals = allGoalsData.items[0].goals;
        allGoals[goals.date] = {
          calories: goals.calories,
          carbs: goals.carbs,
          fat: goals.fat,
          protein: goals.protein
        };
        return this.saveAllGoals(allGoals);
      })
    );
  }

  public saveAllGoals(goals: any) {
    return this.crudService.updateGoals(goals)
  }

  public getGoals() {
    return this.crudService.getGoals().pipe(
      map((goals) => {
        return goals ?? {};
      })
    );
  }

  public getDaysGoals(date: string) {
    return this.getGoals().pipe(
      map((allGoalsData: any) => {
        let allGoals = allGoalsData.items[0].goals;
        if (allGoals) {
          let goals = allGoals[date];
          if (goals) {
            return goals;
          }
        }
        return null;
      })
    );
  }

  public saveWeekGoals(weekGoals: any) {
    return this.crudService.updateWeekGoals(weekGoals);
  }

  public getWeekGoals() {
    return this.crudService.getWeekGoals().pipe(
      map((weekGoalsData: any) => {
        let weekGoals = weekGoalsData.items[0].weekGoals;

        return weekGoals ?? null;
      })
    );
  }

  public getDefaultGoals(dateString: string) {
    return this.getWeekGoals().pipe(
      map((weekGoals: any) => {
        if (weekGoals) {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const today = new Date(dateString);
          const todayStr = days[today.getDay()];
          return weekGoals[todayStr];
        }
        return {
          calories: 0,
          carbs: 0,
          fat: 0,
          protein: 0
        }
      })
    );
  }

  public getSavedFoods() {
    return this.crudService.getFoods().pipe(
      map((foodsData: any) => {
        const foods = foodsData.items[0].foods;
        return foods ?? null;
      })
    );
  }

  public storeNewFood(food: StorableFood) {
    return this.getSavedFoods().pipe(
      mergeMap((foods) => {
        if (!foods) {
          foods = {
            [food.id]: food
          };
        } else {
          foods[food.id] = food;
        }
        return this.updateFoods(foods);
      })
    );
  }

  public updateFoods(foods: { [id: number]: StorableFood }) {
    return this.crudService.updateFoods(foods);
  }

  public getMacros() {
    return this.crudService.getMacros().pipe(
      map((macrosData: any) => {
        const macros = macrosData.items[0].macros;
        return macros ?? null;
      })
    );

  }

  public storeMacros(macros: any) {
    return this.crudService.updateMacros(macros);
  }
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
