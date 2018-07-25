import {Component, OnInit} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';
import {Collection} from '../../../base/models/collection/collection.model';
import {CollectionsService} from '../../../base/services/collections/collections.service';

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

    collection: Collection;
    card: Card;

    constructor(private collectionsService: CollectionsService) {}

    ngOnInit() {
        this.collection = this.collectionsService.getCollection();
        this.next();
    }

    next() {
        this.card = this.collection.nextCard();
    }
}
