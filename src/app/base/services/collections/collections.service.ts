import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';
import {Card} from '../../models/card/card.model';

@Injectable()
export class CollectionsService {

    private spanishCollection = new Collection(1, 'Spanish');
    private germanCollection = new Collection(2, 'German');

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

    public deleteCollection(id: number) {}

    public createCollection(name: string = ''): Collection {
        return new Collection(1, name);
    }
}
