import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';
import {SerializedCollections} from './collections.interface';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {BackendService} from '../backend/backend.service';

@Injectable()
export class CollectionsService {

    collections: Collection[] = [];

    readonly localStorageKey = 'collections';

    constructor(private localStorageService: LocalStorageService,
                private backendService: BackendService) {

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

    public getCollection(id: string): Collection {
        return this.collections.find((collection: Collection) => collection.id === id);
    }

    public deleteCollection(id: string) {
        const index = this.collections.findIndex((collection: Collection) => collection.id === id);
        this.collections.splice(index, 1);
        this.persist();
    }

    public createCollection(name: string = ''): Collection {
        const newCollection = new Collection(this.nextId(), name);
        this.collections.push(newCollection);
        this.persist();
        return newCollection;
    }

    public persist() {
        this.persistToLocalStorage();
    }

    private nextId(): string {
        return Math.random().toString(36).substring(6);
    }

    private persistToLocalStorage() {
        this.localStorageService.setObject(this.localStorageKey, this.serialize());
    }

    private resumeFromLocalStorage() {
        const persistedData = this.localStorageService.getObject(this.localStorageKey);

        if (persistedData) {
            this.deserialize(persistedData);
        }
    }
}
