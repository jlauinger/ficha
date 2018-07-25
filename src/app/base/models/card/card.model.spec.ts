import {Card} from './card.model';

describe('Card', () => {

    let card: Card;

    beforeEach(() => {
        card = new Card('Question', 'Correct Answer');
    });

    it('should notify if an answer is correct', () => {
        expect(card.check('Correct Answer')).toBe(true);
        expect(card.check('Wrong Answer')).toBe(false);
    });

    it('should disregard whitespace in the beginning and end when checking', () => {
        expect(card.check('  Correct Answer\n')).toBe(true);
    });
});
