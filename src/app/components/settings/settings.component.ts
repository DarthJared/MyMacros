import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

type Goals = {
    calories: number
    carbs: number
    fat: number
    protein: number
}

type WeekPlan = {
    Sunday: Goals
    Monday: Goals
    Tuesday: Goals
    Wednesday: Goals
    Thursday: Goals
    Friday: Goals
    Saturday: Goals
}


type MacroSelection = {
    calories: boolean
    carbs: boolean
    fat: boolean
    protein: boolean
}

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    @Output() close = new EventEmitter<string>();
    @Output() clear = new EventEmitter<string>();

    @Input() macrosSelected: MacroSelection = {
        calories: true,
        carbs: true,
        fat: false,
        protein: true
    };

    weekPlan: WeekPlan;
    activeTab: string = 'Defaults';

    constructor(private storageService: StorageService) {
        const loadedWeekPlan = storageService.getWeekGoals()
        if (loadedWeekPlan) {
            this.weekPlan = loadedWeekPlan;
        }
        else {
            this.weekPlan = {
                Sunday: {
                    calories: 0,
                    carbs: 0,
                    fat: 0,
                    protein: 0
                },
                Monday: {
                    calories: 0,
                    carbs: 0,
                    fat: 0,
                    protein: 0
                },
                Tuesday: {
                    calories: 0,
                    carbs: 0,
                    fat: 0,
                    protein: 0
                },
                Wednesday: {
                    calories: 0,
                    carbs: 0,
                    fat: 0,
                    protein: 0
                },
                Thursday: {
                    calories: 0,
                    carbs: 0,
                    fat: 0,
                    protein: 0
                },
                Friday: {
                    calories: 0,
                    carbs: 0,
                    fat: 0,
                    protein: 0
                },
                Saturday: {
                    calories: 0,
                    carbs: 0,
                    fat: 0,
                    protein: 0
                },
            }
        }
    }

    saveMacros() {
        this.storageService.storeMacros(this.macrosSelected);
        this.close.emit('close');
    }

    setActiveTab(tabName: string) {
        this.activeTab = tabName;
    }

    saveGoals() {
        this.storageService.saveWeekGoals(this.weekPlan);
        this.closeModal();
    }

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }    

    clearFoodsMeals() {
        this.clear.emit('foodsMeals');
    }

    clearMeals() {
        this.clear.emit('meals');
    }

    clearGoals() {
        this.clear.emit('goals');
    }

    clearMacros() {
        this.clear.emit('macros');
    }

    clearAll() {
        this.clear.emit('all');
    }
}