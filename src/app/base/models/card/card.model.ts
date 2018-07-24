/**
 * A card represents a single index card. Index cards can be:
 *  - learned, i.e. shown to the user and checked for his answer
 *  - edited in the management area
 *  - part of collections
 */
export class Card {

    constructor(private question: string, private answer: string) {}

    public check(answer: string) {
        return answer === this.answer;
    }
}
