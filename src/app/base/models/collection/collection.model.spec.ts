import {Collection} from './collection.model';
import {Card} from '../card/card.model';

describe('Collection', () => {

    let collection: Collection;
    let serCard: Card;
    let estarCard: Card;

    beforeEach(() => {
        collection = new Collection();
        serCard = new Card('ser', 'to be (trait)');
        estarCard = new Card('estar', 'to be (state, location)');
    });

    it('should have an optional name', () => {
        expect(collection.name).toBe('');

    });

    it('should have the correct name if specified', () => {
        const namedCollection = new Collection('SPANISH');

        expect(namedCollection.name).toBe('SPANISH');
    });

    it('should have no cards in the beginning', () => {
        expect(collection.size()).toBe(0);
    });

    it('should increase in size when adding cards', () => {
        collection.add(serCard);
        collection.add(estarCard);

        expect(collection.size()).toBe(2);
    });

    it('should return a next card if there are any', () => {
        collection.add(serCard);

        expect(collection.nextCard()).toBe(serCard);
    });

    it('should raise an exception on next card if there are none', () => {
        expect(() => { collection.nextCard(); }).toThrow(new Error('Collection is empty.'));
    });

    it('should cycle through the next cards and loop back', () => {
        collection.add(serCard);
        collection.add(estarCard);

        expect(collection.nextCard()).toBe(serCard);
        expect(collection.nextCard()).toBe(estarCard);
        expect(collection.nextCard()).toBe(serCard);
    });
});
