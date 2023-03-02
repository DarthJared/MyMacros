import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Output() settings = new EventEmitter<string>();

    settingsClicked() {
        this.settings.emit('settings');
    }
}