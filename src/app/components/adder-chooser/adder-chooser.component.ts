import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'adder-chooser',
  templateUrl: './adder-chooser.component.html',
  styleUrls: ['./adder-chooser.component.css']
})
export class AdderChooserComponent {
    @Output() close = new EventEmitter<string>();
    @Output() meal = new EventEmitter<string>();

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }

    startMeal() {
        this.meal.emit('new meal');
    }
}