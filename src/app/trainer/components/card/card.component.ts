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
    @Output() shuffle = new EventEmitter<boolean>();

    _card: Card;
    answer = '';
    showAnswer = false;
    answerIsCorrect = false;
    autoSubmit = true;
    shouldShuffle = true;

    public check() {
        this.showAnswer = true;
        this.answerIsCorrect = this._card.check(this.answer);

        if (this.answerIsCorrect) {
            this.next.emit();
        }
    }

    public skip() {
        this.next.emit();
    }

    public markCorrect() {
        this.next.emit();
    }

    public markWrong() {
        this.next.emit();
    }

    public emitShuffle() {
        this.shuffle.emit(this.shouldShuffle);
    }

    public shouldDisplayRight() {
        return this.showAnswer && this.answerIsCorrect;
    }

    public shouldDisplayWrong() {
        return this.showAnswer && !this.answerIsCorrect;
    }

    private reset() {
        this.answer = '';
        this.showAnswer = false;
        this.answerIsCorrect = false;
    }
}
