import {BackendService} from './backend.service';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

describe('BackendService', () => {

    let service: BackendService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BackendService,
                { provide: HttpClient, useClass: HttpClientMock }
            ]
        });
    });

    beforeEach(() => {
        service = TestBed.get(BackendService);
    });

    it('should get the collections JSON', () => {
        const http = TestBed.get(HttpClient);
        spyOn(http, 'get');

        service.getCollections();

        expect(http.get).toHaveBeenCalledWith('http://localhost/ficha-data/collections.json');
    });
});


class HttpClientMock {
    public get(url: string) {}
}
