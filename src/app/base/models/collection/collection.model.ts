import {Card} from '../card/card.model';
import {SerializedCollection} from './collection.interface';
import * as _ from 'lodash';

/*
 * A collection represents a set of cards that belong together. Collections can combine cards of similar topic. Collections can be:
 *  - created, deleted and edited in the management area
 *  - learned in the training area, meaning that cards of the collection are shown to the user
 */
export class Collection {

    public cards: Card[];

    private cardsToShow: Card[];
    private currentCardIndex: number;

    constructor(public id: string, public name: string = '') {
        this.cards = [];
        this.cardsToShow = [];
        this.currentCardIndex = -1;
    }

    public static deserialize(serialized: SerializedCollection): Collection {
        const collection = new Collection(serialized.id, serialized.name);
        collection.currentCardIndex = serialized.currentCardIndex;
        collection.cards = serialized.cards.map(c => Card.deserialize(c));
        collection.cardsToShow = Array.from(collection.cards);
        return collection;
    }

    public serialize(): SerializedCollection {
        return {
            id: this.id,
            name: this.name,
            currentCardIndex: this.currentCardIndex,
            cards: this.cards.map(c => c.serialize())
        };
    }

    public size(): number {
        return this.cards.length;
    }

    public add(card: Card) {
        this.cards.push(card);
        this.reset();
    }

    public remove(card: Card) {
        this.cards.splice(this.cards.indexOf(card), 1);
        this.reset();
    }

    public nextCard(): Card {
        if (this.cardsToShow.length === 0) {
            throw new Error('Collection is empty.');
        }

        this.currentCardIndex = this.nextCardIndex();

        return this.cardsToShow[this.currentCardIndex];
    }

    public currentCardNumber() {
        return this.currentCardIndex + 1;
    }

    public remainingCards() {
        return this.cardsToShow.length - this.currentCardIndex;
    }

    public reset() {
        this.cardsToShow = Array.from(this.cards);
        this.currentCardIndex = -1;
    }

    public setShuffle(shouldShuffle: boolean) {
        this.reset();

        if (shouldShuffle) {
            this.cardsToShow = _.shuffle(this.cardsToShow);
        }
    }

    private nextCardIndex(): number {
        if (this.currentCardIndex >= this.cardsToShow.length - 1) {
            return 0;
        }

        return this.currentCardIndex + 1;
    }
}
