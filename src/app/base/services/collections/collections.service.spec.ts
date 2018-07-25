import {CollectionsService} from './collections.service';
import {Collection} from '../../models/collection/collection.model';

describe('CollectionsService', () => {

    it('should return a collection with a name and at least two cards', () => {
        const service = new CollectionsService();

        const collection = service.getCollection(42);

        expect(collection.name).not.toBe('');
        expect(collection.size()).toBeGreaterThanOrEqual(2);
    });
});
