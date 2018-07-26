import {CollectionsService} from './collections.service';
import {Collection} from '../../models/collection/collection.model';

describe('CollectionsService', () => {

    let service: CollectionsService;

    let spanishCollection: Collection;
    let germanCollection: Collection;

    beforeEach(() => {
        service = new CollectionsService();

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
});
