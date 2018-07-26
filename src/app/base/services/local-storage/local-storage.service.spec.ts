import {LocalStorageService} from './local-storage.service';

describe('LocalStorageService', () => {

    let service: LocalStorageService;

    beforeEach(() => {
        service = new LocalStorageService();
    });

    it('should load a JSON object from local storage', () => {
        spyOn(localStorage, 'getItem').and.returnValue('{"foo":"bar"}');

        const object = service.getObject('test');

        expect(localStorage.getItem).toHaveBeenCalledWith('test');
        expect(object).toEqual({foo: 'bar'});
    });

    it('should persist an object to JSON', () => {
        spyOn(localStorage, 'setItem');

        service.setObject('test', {foo: 'bar'});

        expect(localStorage.setItem).toHaveBeenCalledWith('test', '{"foo":"bar"}');
    });
});
