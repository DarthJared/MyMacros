import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'adder-modal',
  templateUrl: './adder-modal.component.html',
  styleUrls: ['./adder-modal.component.css']
})
export class AdderModalComponent {
    @Output() close = new EventEmitter<string>();
    @Output() start = new EventEmitter<string>();
    mealSelected: string = 'Breakfast';

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }

    startMeal() {
        this.start.emit(this.mealSelected);
    }
}