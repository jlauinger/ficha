import {Component, OnInit} from '@angular/core';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {Collection} from '../../../base/models/collection/collection.model';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

    localCollections: Collection[];
    remoteCollections: Observable<Collection[]>;
    newName = '';

    constructor(private collectionsService: CollectionsService) {}

    ngOnInit(): void {
        this.localCollections = this.collectionsService.getLocalCollections();
        this.remoteCollections = this.collectionsService.getRemoteCollections();
    }

    public new() {
        const newCollection = this.collectionsService.createLocalCollection(this.newName);
        this.localCollections.push(newCollection);
        this.newName = '';
    }

    public mainLinkFor(collection: Collection) {
        return collection.size()
            ? ['/', 'train', collection.id]
            : ['/', 'manage', collection.id];
    }
}
