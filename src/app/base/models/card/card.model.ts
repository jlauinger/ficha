/**
 * A card represents a single index card. Index cards can be:
 *  - learned, i.e. shown to the user and checked for his answer
 *  - edited in the management area
 *  - part of collections
 */
export class Card {

    constructor(public question: string, public solution: string) {}

    public check(answer: string) {
        return answer.trim() === this.solution.trim();
    }
}
