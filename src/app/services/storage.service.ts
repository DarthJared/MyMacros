import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveMeals(meals: any) {
    let allMeals = this.getMeals();
    allMeals[meals.date] = meals.meals;
    this.saveAllMeals(allMeals);
  }

  public saveAllMeals(meals: any) {
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  public getMeals() {
    let meals: any = localStorage.getItem('meals');
    if (meals) {
        return JSON.parse(meals);
    }
    return {};
  }

  public getDaysMeals(date: string) {
    let allMeals = this.getMeals();
    if (allMeals) {
        let daysMeals = allMeals[date];
        if (daysMeals) {
            return daysMeals;
        }
    }
    return [];
  }

  public saveGoals(goals: any) {
    let allGoals = this.getGoals();
    allGoals[goals.date] = {
        calories: goals.calories,
        carbs: goals.carbs,
        fat: goals.fat,
        protein: goals.protein
    };
    this.saveAllGoals(allGoals);
  }

  public saveAllGoals(goals: any) {
    localStorage.setItem('goals', JSON.stringify(goals));
  }

  public getGoals() {
    let goals: any = localStorage.getItem('goals');
    if (goals) {
        return JSON.parse(goals);
    }
    return {};
  }

  public getDaysGoals(date: string) {
    let allGoals = this.getGoals();
    if (allGoals) {;
        let goals = allGoals[date];
        if (goals) {
            return goals;
        }
    }
    return null;
  }

  public saveWeekGoals(weekGoals: any) {
    localStorage.setItem('weekGoals', JSON.stringify(weekGoals));
  }

  public getWeekGoals() {
    const weekGoals = localStorage.getItem('weekGoals');
    if (weekGoals) {
        return JSON.parse(weekGoals);
    }
    return null;
  }

  public getDefaultGoals(dateString: string) {
    const weekGoals = this.getWeekGoals();
    if (weekGoals) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday','Saturday'];
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
  }

  public getSavedFoods() {
    const foods = localStorage.getItem('foods');
    if (foods) {
        return JSON.parse(foods);
    }
    return null;
  }

  public storeNewFood(food: StorableFood) {
    let foods = this.getSavedFoods();
    if (!foods) {
        foods = {
            [food.id]: food
        };
    }
    else {
        foods[food.id] = food;
    }
    localStorage.setItem('foods', JSON.stringify(foods));
  }

  public updateFoods(foods: { [id: number]: StorableFood }) {
    localStorage.setItem('foods', JSON.stringify(foods));
  }

  public getMacros() {
    const macros = localStorage.getItem('macros');
    return macros ? JSON.parse(macros) : null;
  }

  public storeMacros(macros: any) {
    localStorage.setItem('macros', JSON.stringify(macros));
  }

  public clearItem(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
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