import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'adder-modal',
  templateUrl: './adder-modal.component.html',
  styleUrls: ['./adder-modal.component.css']
})
export class AdderModalComponent {
    @Output() close = new EventEmitter<string>();

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }
}