import { Component, Input } from '@angular/core';

@Component({
  selector: 'remaining',
  templateUrl: './remaining.component.html',
  styleUrls: ['./remaining.component.css']
})
export class RemainingComponent {
  @Input() calories: number = 0;
  @Input() carbs: number = 0;
  @Input() protein: number = 0;
}
