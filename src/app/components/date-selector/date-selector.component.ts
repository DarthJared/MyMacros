import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent {
    @Input() selectedDate: Date = new Date();
    @Output() dateChanged = new EventEmitter<Date>();

    updateDate(event: any) {
      console.log(event)
      const selectedDateString = event.target.value;
      const dateParts: string[] = selectedDateString.split('-');
      this.dateChanged.emit(new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])));
    }
}
