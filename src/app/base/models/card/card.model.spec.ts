import {Card} from './card.model';

describe('Card', () => {

    it('should notify if an answer is correct', () => {
        const card = new Card('Question', 'Correct Answer');

        expect(card.check('Correct Answer')).toBe(true);
        expect(card.check('Wrong Answer')).toBe(false);
    });
});
