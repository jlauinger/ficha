import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {

    @Input() card: Card;
    @Output() next = new EventEmitter<void>();

    answer = '';
    result = '';

    public check() {
        console.log(this.answer);
        if (this.card.check(this.answer)) {
            this.next.emit();
        } else {
            this.result = 'Wrong answer!';
        }
    }
}
