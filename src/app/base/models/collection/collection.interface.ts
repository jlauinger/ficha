import {SerializedCard} from '../card/card.interface';

export interface SerializedCollection {

    id: number;
    name: string;

    cards: SerializedCard[];

    currentCardIndex: number;
}
