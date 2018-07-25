import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';
import {Card} from '../../models/card/card.model';

@Injectable()
export class CollectionsService {

    private spanishCollection = new Collection('Spanish');
    private germanCollection = new Collection('German');

    constructor() {
        this.spanishCollection.add(new Card('ser', 'to be (trait)'));
        this.spanishCollection.add(new Card('estar', 'to be (state, location)'));
        this.spanishCollection.add(new Card('la canción', 'the song'));

        this.germanCollection.add(new Card('gehen', 'to walk'));
        this.germanCollection.add(new Card('rennen', 'to run'));
    }

    public getCollection(id: number): Collection {
        return this.spanishCollection;
    }

    public getCollections(): Collection[] {
        return [this.spanishCollection, this.germanCollection];
    }
}
