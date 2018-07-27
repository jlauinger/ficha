import {Injectable} from '@angular/core';
import {Collection} from '../../models/collection/collection.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {SerializedCollection} from '../../models/collection/collection.interface';

@Injectable()
export class BackendService {

    readonly collectionsUrl: string = environment.apiHost + '/collections.json';

    constructor(private http: HttpClient) {}

    public getCollections(): Observable<SerializedCollection[]> {
        return this.http.get<SerializedCollection[]>(this.collectionsUrl);
    }
}
