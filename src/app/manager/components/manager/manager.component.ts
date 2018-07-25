import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Collection} from '../../../base/models/collection/collection.model';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {Card} from '../../../base/models/card/card.model';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

    collection: Collection;

    constructor(private route: ActivatedRoute,
                public router: Router,
                private collectionsService: CollectionsService) {}

    ngOnInit() {
        const collectionId = Number(this.route.snapshot.paramMap.get('id'));
        this.collection = this.collectionsService.getCollection(collectionId);
    }

    public add() {
        this.collection.add(new Card('', ''));
    }

    public delete(card: Card) {
        this.collection.remove(card);
    }

    public deleteCollection() {
        this.collectionsService.deleteCollection(this.collection.id);
        this.router.navigate(['/']);
    }
}
