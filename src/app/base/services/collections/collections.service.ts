import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';
import {SerializedCollections} from './collections.interface';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {BackendService} from '../backend/backend.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CollectionsService {

    localCollections: Collection[] = [];
    remoteCollections: Observable<Collection[]>;

    readonly localStorageKey = 'collections';

    constructor(private localStorageService: LocalStorageService,
                private backendService: BackendService) {

        this.resumeFromLocalStorage();
        this.loadRemoteCollections();
    }

    public serialize(): SerializedCollections {
        return { collections: this.localCollections.map(c => c.serialize()) };
    }

    public deserialize(serialized: SerializedCollections) {
        this.localCollections = serialized.collections.map(c => Collection.deserialize(c));
    }

    public getLocalCollections(): Collection[] {
        return this.localCollections.slice();
    }

    public getLocalCollection(id: string): Collection {
        return this.localCollections.find((collection: Collection) => collection.id === id);
    }

    public deleteLocalCollection(id: string) {
        const index = this.localCollections.findIndex((collection: Collection) => collection.id === id);
        this.localCollections.splice(index, 1);
        this.persist();
    }

    public createLocalCollection(name: string = ''): Collection {
        const newCollection = new Collection(this.nextId(), name);
        this.localCollections.push(newCollection);
        this.persist();
        return newCollection;
    }

    public persist() {
        this.persistToLocalStorage();
    }

    public getRemoteCollections(): Observable<Collection[]> {
        return this.remoteCollections;
    }

    public getRemoteCollection(id: string): Observable<Collection> {
        return this.remoteCollections.pipe(map((collections) => {
            return collections.find((collection: Collection) => collection.id === id);
        }));
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

    private loadRemoteCollections() {
        this.remoteCollections = this.backendService.getCollections();
    }
}
