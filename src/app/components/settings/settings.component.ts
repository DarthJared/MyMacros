import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

type Goals = {
    calories: number
    carbs: number
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

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    @Output() close = new EventEmitter<string>();

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
                    protein: 0
                },
                Monday: {
                    calories: 0,
                    carbs: 0,
                    protein: 0
                },
                Tuesday: {
                    calories: 0,
                    carbs: 0,
                    protein: 0
                },
                Wednesday: {
                    calories: 0,
                    carbs: 0,
                    protein: 0
                },
                Thursday: {
                    calories: 0,
                    carbs: 0,
                    protein: 0
                },
                Friday: {
                    calories: 0,
                    carbs: 0,
                    protein: 0
                },
                Saturday: {
                    calories: 0,
                    carbs: 0,
                    protein: 0
                },
            }
        }
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
}