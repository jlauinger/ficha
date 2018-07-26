import {CollectionsService} from './collections.service';
import {Collection} from '../../models/collection/collection.model';
import {SerializedCollections} from './collections.interface';
import {BackendService} from '../backend/backend.service';
import {TestBed} from '@angular/core/testing';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Observable, of} from 'rxjs';

describe('CollectionsService', () => {

    let service: CollectionsService;

    let spanishCollection: Collection;
    let germanCollection: Collection;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CollectionsService,
                { provide: LocalStorageService, useClass: LocalStorageServiceMock },
                { provide: BackendService, useClass: BackendServiceMock }
            ]
        });
    });

    beforeEach(() => {
        service = TestBed.get(CollectionsService);

        spanishCollection = new Collection('1', 'Spanish');
        germanCollection = new Collection('2', 'German');

        service.localCollections = [spanishCollection, germanCollection];
    });

    it('should return a list of collections', () => {
        const collections = service.getCollections();

        expect(collections).toEqual([spanishCollection, germanCollection]);
    });

    it('should return a the correct collection by index', () => {
        const collection = service.getCollection('2');

        expect(collection).toBe(germanCollection);
    });

    it('should delete the correct collection', () => {
        service.deleteCollection('1');

        expect(service.localCollections).toEqual([germanCollection]);
    });

    it('should return a new collection with specified name and a unique ID', () => {
        const newCollection = service.createCollection('English');

        expect(service.localCollections).toContain(newCollection);
        expect(newCollection.name).toBe('English');
        expect(newCollection.size()).toBe(0);
        expect(newCollection.id).not.toBe('1');
        expect(newCollection.id).not.toBe('2');
    });

    it('should serialize', () => {
        const serialized: SerializedCollections = {
            collections: [
                { id: '1', name: 'Spanish', currentCardIndex: -1, cards: [] },
                { id: '2', name: 'German', currentCardIndex: -1, cards: [] }
            ]
        };

        expect(service.serialize()).toEqual(serialized);
    });

    it('should deserialize', () => {
        const serialized: SerializedCollections = {
            collections: [{ id: '2', name: 'German', currentCardIndex: -1, cards: [] }]
        };

        service.deserialize(serialized);

        expect(service.localCollections).toEqual([germanCollection]);
    });

    it('should load data from local storage when created', () => {
        const localStorageService = TestBed.get(LocalStorageService);
        const backendService = TestBed.get(BackendService);
        spyOn(localStorageService, 'getObject').and.returnValue({
            collections: [{ id: '2', name: 'German', currentCardIndex: -1, cards: [] }]
        });

        const loadingService = new CollectionsService(localStorageService, backendService);

        expect(localStorageService.getObject).toHaveBeenCalledWith('collections');
        expect(loadingService.localCollections).toEqual([new Collection('2', 'German')]);
    });

    it('should persist data to local storage', () => {
        const localStorageService = TestBed.get(LocalStorageService);
        spyOn(localStorageService, 'setObject');
        const serialized: SerializedCollections = {
            collections: [
                { id: '1', name: 'Spanish', currentCardIndex: -1, cards: [] },
                { id: '2', name: 'German', currentCardIndex: -1, cards: [] }
            ]
        };

        service.persist();

        expect(localStorageService.setObject).toHaveBeenCalledWith('collections', serialized);
    });

    it('should persist when deleting a collection', () => {
        spyOn(service, 'persist');

        service.deleteCollection('1');

        expect(service.persist).toHaveBeenCalled();
    });

    it('should persist when creating a collection', () => {
        spyOn(service, 'persist');

        service.createCollection();

        expect(service.persist).toHaveBeenCalled();
    });

    it('should load data from server backend when created', () => {
        const localStorageService = TestBed.get(LocalStorageService);
        const backendService = TestBed.get(BackendService);
        spyOn(backendService, 'getCollections').and.returnValue(of([
            new Collection('2', 'German')
        ]));
        const loadingService = new CollectionsService(localStorageService, backendService);

        expect(backendService.getCollections).toHaveBeenCalled();
        expect(loadingService.remoteCollections).toEqual([new Collection('2', 'German')]);
    });
});


class LocalStorageServiceMock {
    public getObject(key: string): any { return null; }
    public setObject(key: string, data: any) {}
}

class BackendServiceMock {
    public getCollections(): Observable<Collection[]> { return of([]); }
}
