import {SerializedCard} from '../card/card.interface';

export interface SerializedCollection {

    id: string;
    name: string;

    cards: SerializedCard[];

    currentCardIndex: number;
}
