import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';
import {SerializedCollections} from './collections.interface';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable()
export class CollectionsService {

    collections: Collection[] = [];

    readonly localStorageKey = 'collections';

    constructor(private localStorageService: LocalStorageService) {
        this.resumeFromLocalStorage();
    }

    public serialize(): SerializedCollections {
        return { collections: this.collections.map(c => c.serialize()) };
    }

    public deserialize(serialized: SerializedCollections) {
        this.collections = serialized.collections.map(c => Collection.deserialize(c));
    }

    public getCollections(): Collection[] {
        return this.collections.slice();
    }

    public getCollection(id: number): Collection {
        return this.collections.find((collection: Collection) => collection.id === id);
    }

    public deleteCollection(id: number) {
        const index = this.collections.findIndex((collection: Collection) => collection.id === id);
        this.collections.splice(index, 1);
        this.persistToLocalStorage();
    }

    public createCollection(name: string = ''): Collection {
        const newCollection = new Collection(this.nextId(), name);
        this.collections.push(newCollection);
        this.persistToLocalStorage();
        return newCollection;
    }

    public persistToLocalStorage() {
        this.localStorageService.setObject(this.localStorageKey, this.serialize());
    }

    private nextId(): number {
        const ids = this.collections.map(collection => collection.id);
        return Math.max(0, ...ids) + 1;
    }

    private resumeFromLocalStorage() {
        const persistedData = this.localStorageService.getObject(this.localStorageKey);

        if (persistedData) {
            this.deserialize(persistedData);
        }
    }
}
