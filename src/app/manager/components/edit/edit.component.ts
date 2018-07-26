import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent {

    @Input() card: Card;
    @Input() skeleton: boolean;

    @Output() deleted = new EventEmitter<void>();
    @Output() created = new EventEmitter<void>();

    public delete() {
        this.deleted.emit();
    }

    public onKeyUp(event: KeyboardEvent) {
        if (!this.skeleton) {
            return;
        }

        if (this.keycodeShouldTriggerCreate(event.which)) {
            this.create();
        }
    }

    public create() {
        this.skeleton = false;
        this.created.emit();
    }

    private keycodeShouldTriggerCreate(keycode: number): boolean {
        return keycode >= 48 && keycode <= 90 ||
            keycode >= 96 && keycode <= 111 ||
            keycode >= 186 && keycode <= 222;
    }
}
