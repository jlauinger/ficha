import {CollectionsService} from './collections.service';
import {Collection} from '../../models/collection/collection.model';
import {SerializedCollections} from './collections.interface';

describe('CollectionsService', () => {

    let localStorageService: LocalStorageServiceMock;
    let service: CollectionsService;

    let spanishCollection: Collection;
    let germanCollection: Collection;

    beforeEach(() => {
        localStorageService = new LocalStorageServiceMock();
        service = new CollectionsService(localStorageService);

        spanishCollection = new Collection(1, 'Spanish');
        germanCollection = new Collection(2, 'German');

        service.collections = [spanishCollection, germanCollection];
    });

    it('should return a list of collections', () => {
        const collections = service.getCollections();

        expect(collections).toEqual([spanishCollection, germanCollection]);
    });

    it('should return a the correct collection by index', () => {
        const collection = service.getCollection(2);

        expect(collection).toBe(germanCollection);
    });

    it('should delete the correct collection', () => {
        service.deleteCollection(1);

        expect(service.collections).toEqual([germanCollection]);
    });

    it('should return a new collection with specified name and a unique ID', () => {
        const newCollection = service.createCollection('English');

        expect(service.collections).toContain(newCollection);
        expect(newCollection.name).toBe('English');
        expect(newCollection.size()).toBe(0);
        expect(newCollection.id).not.toBe(1);
        expect(newCollection.id).not.toBe(2);
    });

    it('should serialize', () => {
        const serialized: SerializedCollections = {
            collections: [
                { id: 1, name: 'Spanish', currentCardIndex: -1, cards: [] },
                { id: 2, name: 'German', currentCardIndex: -1, cards: [] }
            ]
        };

        expect(service.serialize()).toEqual(serialized);
    });

    it('should deserialize', () => {
        const serialized: SerializedCollections = {
            collections: [{ id: 2, name: 'German', currentCardIndex: -1, cards: [] }]
        };

        service.deserialize(serialized);

        expect(service.collections).toEqual([germanCollection]);
    });

    it('should load data from local storage when created', () => {
        spyOn(localStorageService, 'getObject').and.returnValue({
            collections: [{ id: 2, name: 'German', currentCardIndex: -1, cards: [] }]
        });
        const loadingService = new CollectionsService(localStorageService);

        expect(localStorageService.getObject).toHaveBeenCalledWith('collections');
        expect(loadingService.collections).toEqual([new Collection(2, 'German')]);
    });

    it('should persist data to local storage', () => {
        spyOn(localStorageService, 'setObject');
        const serialized: SerializedCollections = {
            collections: [
                { id: 1, name: 'Spanish', currentCardIndex: -1, cards: [] },
                { id: 2, name: 'German', currentCardIndex: -1, cards: [] }
            ]
        };

        service.persistToLocalStorage();

        expect(localStorageService.setObject).toHaveBeenCalledWith('collections', serialized);
    });

    it('should persist when deleting a collection', () => {
        spyOn(service, 'persistToLocalStorage');

        service.deleteCollection(1);

        expect(service.persistToLocalStorage).toHaveBeenCalled();
    });

    it('should persist when creating a collection', () => {
        spyOn(service, 'persistToLocalStorage');

        service.createCollection();

        expect(service.persistToLocalStorage).toHaveBeenCalled();
    });
});


class LocalStorageServiceMock {

    public getObject(key: string): any { return null; }

    public setObject(key: string, data: any) {}
}
