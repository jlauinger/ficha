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

    collection = new Collection('', '');
    card = new Card('', '');

    constructor(private route: ActivatedRoute,
                private collectionsService: CollectionsService) {}

    ngOnInit() {
        const collectionId = this.route.snapshot.paramMap.get('id');
        this.collectionsService.getCollection(collectionId).subscribe((collection) => {
            this.collection = collection;
            this.collection.setShuffle(true);
            this.collection.reset();
            this.next();
        });
    }

    next() {
        this.card = this.collection.nextCard();
    }

    shuffle(shouldShuffle: boolean) {
        this.collection.setShuffle(shouldShuffle);
        this.next();
    }
}
