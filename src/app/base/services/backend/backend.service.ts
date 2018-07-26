import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable()
export class BackendService {

    readonly collectionsUrl: string = environment.apiHost + '/collections.json';

    constructor(private http: HttpClient) {}

    public getCollections(): Observable<Collection[]> {
        return this.http.get<Collection[]>(this.collectionsUrl);
    }
}
