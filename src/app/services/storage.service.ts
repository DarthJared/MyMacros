import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveMeals(meals: any) {
    let allMeals = this.getMeals();
    allMeals[meals.date] = meals.meals;
    localStorage.setItem('meals', JSON.stringify(allMeals));
  }

  public getMeals() {
    let meals: any = localStorage.getItem('meals');
    if (meals) {
        return JSON.parse(meals);
    }
    return {};
  }

  public getTodaysMeals(date: string) {
    let allMeals = this.getMeals();
    if (allMeals) {
        let todaysMeals = allMeals[date];
        if (todaysMeals) {
            return todaysMeals;
        }
    }
    return [];
  }

  public saveGoals(goals: any) {
    let allGoals = this.getGoals();
    allGoals[goals.date] = {
        calories: goals.calories,
        carbs: goals.carbs,
        protein: goals.protein
    };
    localStorage.setItem('goals', JSON.stringify(allGoals));
  }

  public getGoals() {
    let goals: any = localStorage.getItem('goals');
    if (goals) {
        return JSON.parse(goals);
    }
    return {};
  }

  public getTodaysGoals(date: string) {
    let allGoals = this.getGoals();
    if (allGoals) {;
        let todaysGoals = allGoals[date];
        if (todaysGoals) {
            return todaysGoals;
        }
    }
    return {
        calories: 0,
        carbs: 0,
        protein: 0
    };
  }

  public clearData() {
    localStorage.clear();
  }
}