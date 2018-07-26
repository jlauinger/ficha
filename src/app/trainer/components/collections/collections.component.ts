import {Component, OnInit} from '@angular/core';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {Collection} from '../../../base/models/collection/collection.model';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

    collections: Collection[];
    newName = '';

    constructor(private collectionsService: CollectionsService) {}

    ngOnInit(): void {
        this.collections = this.collectionsService.getCollections();
    }

    public new() {
        const newCollection = this.collectionsService.createCollection(this.newName);
        this.collections.push(newCollection);
        this.newName = '';
    }

    public mainLinkFor(collection: Collection) {
        return collection.size()
            ? ['/', 'train', collection.id]
            : ['/', 'manage', collection.id];
    }
}
