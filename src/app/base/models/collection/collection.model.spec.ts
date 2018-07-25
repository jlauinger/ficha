import {Collection} from './collection.model';
import {Card} from '../card/card.model';

describe('Collection', () => {

    let collection: Collection;
    let serCard: Card;
    let estarCard: Card;

    beforeEach(() => {
        collection = new Collection(1);

        serCard = new Card('ser', 'to be (trait)');
        estarCard = new Card('estar', 'to be (state, location)');

        collection.add(serCard);
        collection.add(estarCard);
    });

    it('should have an optional name', () => {
        expect(collection.name).toBe('');
    });

    it('should have the correct name if specified', () => {
        const namedCollection = new Collection(1, 'SPANISH');

        expect(namedCollection.name).toBe('SPANISH');
    });

    it('should have no cards in the beginning', () => {
        const emptyCollection = new Collection(1);

        expect(emptyCollection.size()).toBe(0);
    });

    it('should raise an exception on next card if there are none', () => {
        const emptyCollection = new Collection(1);

        expect(() => { emptyCollection.nextCard(); }).toThrow(new Error('Collection is empty.'));
    });

    it('should increase in size when adding cards', () => {
        expect(collection.size()).toBe(2);
    });

    it('should return a next card if there are any', () => {
        expect(collection.nextCard()).toBe(serCard);
    });

    it('should cycle through the next cards and loop back', () => {
        expect(collection.nextCard()).toBe(serCard);
        expect(collection.nextCard()).toBe(estarCard);
        expect(collection.nextCard()).toBe(serCard);
    });

    it('should inform the current index of the active card', () => {
        collection.nextCard();

        expect(collection.currentCardNumber()).toBe(1);
    });

    it('should inform how many cards are left to learn', () => {
        collection.nextCard();
        collection.nextCard();

        expect(collection.remainingCards()).toBe(1);
    });

    it('should reset to the first card when reset is called', () => {
        collection.nextCard();

        collection.reset();

        expect(collection.nextCard()).toBe(serCard);
    });
});
