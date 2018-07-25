import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';
import {Card} from '../../models/card/card.model';

@Injectable()
export class CollectionsService {

    constructor() {}

    getCollection(id: number) {
        const collection = new Collection('SPANISH');

        collection.add(new Card('ser', 'to be (trait)'));
        collection.add(new Card('estar', 'to be (state, location)'));
        collection.add(new Card('la canción', 'the song'));

        return collection;
    }
}
