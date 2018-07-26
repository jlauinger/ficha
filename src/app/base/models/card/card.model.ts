/**
 * A card represents a single index card. Index cards can be:
 *  - learned, i.e. shown to the user and checked for his answer
 *  - edited in the management area
 *  - part of collections
 */
import {SerializedCard} from './card.interface';

export class Card {

    constructor(public question: string, public solution: string) {}

    static deserialize(serialized: SerializedCard): Card {
        return new Card(serialized.question, serialized.solution);
    }

    public serialize(): SerializedCard {
        return {
            question: this.question,
            solution: this.solution
        };
    }

    public check(answer: string) {
        return answer.trim() === this.solution.trim();
    }
}
