import {CollectionsService} from './collections.service';

describe('CollectionsService', () => {

    let service: CollectionsService;

    beforeEach(() => {
        service = new CollectionsService();
    });

    it('should return a collection with a name and at least two cards', () => {
        const collection = service.getCollection(42);

        expect(collection.name).not.toBe('');
        expect(collection.size()).toBeGreaterThanOrEqual(2);
    });

    it('should return a list of collections', () => {
        const collections = service.getCollections();

        expect(collections.length).toBeGreaterThan(0);
    });
});
