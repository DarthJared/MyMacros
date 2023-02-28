import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent {
    @Output() add = new EventEmitter<string>();
    
    addClicked() {
        this.add.emit('add')
    }
}
