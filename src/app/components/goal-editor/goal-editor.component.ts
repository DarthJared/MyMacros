import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'goal-editor',
    templateUrl: './goal-editor.component.html',
    styleUrls: ['./goal-editor.component.css']
})
export class GoalEditorComponent {
    @Input() currentAmount: number = 0;
    @Input() goalName: string = ''
    @Output() updated = new EventEmitter<{ goalName: string, goal: number }>();
    @Output() close = new EventEmitter<string>();

    updateGoal() {
        this.updated.emit({ goalName: this.goalName, goal: this.currentAmount });
    }

    closeModal() {
        this.close.emit('close');
    }

    doNothing(event: any) {
        event.stopPropagation();
    }
}