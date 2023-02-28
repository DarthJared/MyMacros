import { Component, Input} from '@angular/core';

@Component({
  selector: 'today-food',
  templateUrl: './today-food.component.html',
  styleUrls: ['./today-food.component.css']
})
export class TodayFoodComponent {
    @Input() food: any = null;
}
