import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {

    @Input()
    public set card(card: Card) {
        this._card = card;
        this.reset();
    }

    @Output() next = new EventEmitter<void>();

    _card: Card;
    answer = '';
    result = '';
    showAnswer = false;

    public check() {
        this.showAnswer = true;

        if (this._card.check(this.answer)) {
            this.result = 'Correct!';
            this.next.emit();
        } else {
            this.result = 'Wrong solution!';
        }
    }

    public skip() {
        this.next.emit();
    }

    private reset() {
        this.answer = '';
        this.showAnswer = false;
        this.result = '';
    }
}
