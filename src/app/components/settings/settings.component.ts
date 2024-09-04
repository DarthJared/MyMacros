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
    @Output() import = new EventEmitter<{ type: string, value: any }>();

    @Input() macrosSelected: MacroSelection = {
        calories: true,
        carbs: true,
        fat: false,
        protein: true
    };

    weekPlan: WeekPlan = {
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
    activeTab: string = 'Defaults';
    importType: string = 'macros';
    importValue: string = '';

    constructor(private storageService: StorageService) {
        this.storageService.getMacros().subscribe((loadedMacros) => {
          this.importValue = JSON.stringify(loadedMacros);
        });

        this.storageService.getWeekGoals().subscribe((loadedWeekPlan: WeekPlan) => {
          if (loadedWeekPlan) {
            this.weekPlan = loadedWeekPlan;
          }
        });
    }

    saveMacros() {
      this.storageService.storeMacros(this.macrosSelected).subscribe(() => {
        this.close.emit('close');
      });
    }

    setActiveTab(tabName: string) {
        this.activeTab = tabName;
    }

    saveGoals() {
        this.storageService.saveWeekGoals(this.weekPlan).subscribe(() => {
          this.closeModal();
        });
    }

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }

    importData() {
        this.import.emit({
            type: this.importType,
            value: this.importValue
        });
    }

    importToChanged(toLoadEvent: any) {
        let loaded = '';
        switch(toLoadEvent.target.value) {
            case 'macros':
                this.storageService.getMacros().subscribe((loaded) => {
                    this.importValue = JSON.stringify(loaded);
                });
                break;
            case 'goals':
                this.storageService.getGoals().subscribe((loaded) => {
                    this.importValue = JSON.stringify(loaded.items[0].goals);
                });
                break;
            case 'meals':
                this.storageService.getMeals().subscribe((loaded) => {
                    this.importValue = JSON.stringify(loaded.items[0].meals);
                });
                break;
            case 'weekGoals':
                this.storageService.getWeekGoals().subscribe((loaded) => {
                  this.importValue = JSON.stringify(loaded);
                });
                break;
            case 'foods':
                this.storageService.getSavedFoods().subscribe((loaded) => {
                  this.importValue = JSON.stringify(loaded);
                });
                break;
        }
        this.importValue = loaded;
    }
}
