import {Card} from '../card/card.model';

/*
 * A collection represents a set of cards that belong together. Collections can combine cards of similar topic. Collections can be:
 *  - created, deleted and edited in the management area
 *  - learned in the training area, meaning that cards of the collection are shown to the user
 */
export class Collection {

    public cards: Card[];

    private currentCardIndex: number;

    constructor(public id: number, public name: string = '') {
        this.cards = [];
        this.currentCardIndex = -1;
    }

    public size(): number {
        return this.cards.length;
    }

    public add(card: Card) {
        this.cards.push(card);
    }

    public remove(card: Card) {
        this.cards.splice(this.cards.indexOf(card), 1);
    }

    public nextCard(): Card {
        if (this.cards.length === 0) {
            throw new Error('Collection is empty.');
        }

        this.currentCardIndex = this.nextCardIndex();

        return this.cards[this.currentCardIndex];
    }

    public currentCardNumber() {
        return this.currentCardIndex + 1;
    }

    public remainingCards() {
        return this.cards.length - this.currentCardIndex;
    }

    public reset() {
        this.currentCardIndex = -1;
    }

    private nextCardIndex(): number {
        if (this.currentCardIndex >= this.cards.length - 1) {
            return 0;
        }

        return this.currentCardIndex + 1;
    }
}
