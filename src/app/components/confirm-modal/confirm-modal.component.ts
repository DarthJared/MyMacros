import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
    @Output() close = new EventEmitter<string>();
    @Output() confirm = new EventEmitter<{context: any, actionKey: string}>();
    @Input() confirmText = 'Confirm';
    @Input() message = 'Are you sure?';
    @Input() actionKey = '';
    @Input() context: any = {};

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }

    confirmClicked() {
        this.confirm.emit({ context: this.context, actionKey: this.actionKey });
    }
}