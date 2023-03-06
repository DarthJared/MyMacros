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

  public removeStoredFood(foodId: number) {
    let foods = this.getSavedFoods();
    if (foods) {
        delete foods[foodId];
        localStorage.setItem('foods', JSON.stringify(foods));
    }
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
  proteinPerServing: number
}