import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent {

    @Input() card: Card;

    @Output() deleted = new EventEmitter<void>();

    public delete() {
        this.deleted.emit();
    }
}
