import {Component, OnInit} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';
import {Collection} from '../../../base/models/collection/collection.model';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

    collection: Collection;
    card: Card;

    constructor(private route: ActivatedRoute,
                private collectionsService: CollectionsService) {}

    ngOnInit() {
        const collectionId = this.route.snapshot.paramMap.get('id');
        this.collection = this.collectionsService.getLocalCollection(collectionId);
        this.collection.reset();
        this.next();
    }

    next() {
        this.card = this.collection.nextCard();
    }
}
