import { Component } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
    adderModalShowing: boolean = false;

    displayAdderModal() {
        this.adderModalShowing = true;
    }

    hideAdderModal() {
        this.adderModalShowing = false;
    }
}
