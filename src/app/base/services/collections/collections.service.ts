import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';

@Injectable()
export class CollectionsService {

    collections: Collection[] = [];

    public getCollections(): Collection[] {
        return this.collections.slice();
    }

    public getCollection(id: number): Collection {
        return this.collections.find((collection: Collection) => collection.id === id);
    }

    public deleteCollection(id: number) {
        const index = this.collections.findIndex((collection: Collection) => collection.id === id);
        this.collections.splice(index, 1);
    }

    public createCollection(name: string = ''): Collection {
        const newCollection = new Collection(this.nextId(), name);
        this.collections.push(newCollection);
        return newCollection;
    }

    private nextId(): number {
        const ids = this.collections.map(collection => collection.id);
        return Math.max(0, ...ids) + 1;
    }
}
