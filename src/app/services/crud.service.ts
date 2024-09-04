import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  macrosUuid: string = '';
  foodsUuid: string = '';
  mealsUuid: string = '';
  goalsUuid: string = '';
  weekGoalsUuid: string = '';

  constructor(private http: HttpClient) { }

  public getMacros() {
    return this.http.get('https://crudapi.co.uk/api/v1/macros', {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    }).pipe(
      tap((res: any) => {
        this.macrosUuid = res.items[0]._uuid;
      })
    );
  }
  public getFoods() {
    return this.http.get('https://crudapi.co.uk/api/v1/foods', {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    }).pipe(
      tap((res: any) => {
        this.foodsUuid = res.items[0]._uuid;
      })
    );
  }
  public getMeals() {
    return this.http.get('https://crudapi.co.uk/api/v1/meals', {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    }).pipe(
      tap((res: any) => {
        this.mealsUuid = res.items[0]._uuid;
      })
    );
  }
  public getGoals() {
    return this.http.get('https://crudapi.co.uk/api/v1/goals', {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    }).pipe(
      tap((res: any) => {
        this.goalsUuid = res.items[0]._uuid;
      })
    );
  }
  public getWeekGoals() {
    return this.http.get('https://crudapi.co.uk/api/v1/weekGoals', {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    }).pipe(
      tap((res: any) => {
        this.weekGoalsUuid = res.items[0]._uuid;
      })
    );
  }

  public updateMacros(macros: any) {
    return this.http.put('https://crudapi.co.uk/api/v1/macros', [{
      '_uuid': this.macrosUuid,
      macros
    }], {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    });
  }

  public updateFoods(foods: any) {
    return this.http.put('https://crudapi.co.uk/api/v1/foods', [{
      '_uuid': this.foodsUuid,
      foods
    }], {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    });
  }

  public updateMeals(meals: any) {
    return this.http.put('https://crudapi.co.uk/api/v1/meals', [{
      '_uuid': this.mealsUuid,
      meals
    }], {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    });
  }

  public updateGoals(goals: any) {
    return this.http.put('https://crudapi.co.uk/api/v1/goals', [{
      '_uuid': this.goalsUuid,
      goals
    }], {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    });
  }

  public updateWeekGoals(weekGoals: any) {
    return this.http.put('https://crudapi.co.uk/api/v1/weekGoals', [{
      '_uuid': this.weekGoalsUuid,
      weekGoals
    }], {
      headers: {
        Authorization: 'Bearer vFSvPLKi2jzSnAldCwx0gEjJhlYElc_DauSjRztUBsCusTG3Ew'
      }
    });
  }
}
