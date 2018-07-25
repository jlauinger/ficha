import {Component, OnInit} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';
import {Collection} from '../../../base/models/collection/collection.model';
import {qR} from '@angular/core/src/render3';

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

    collection: Collection;
    card: Card;

    ngOnInit() {
        this.collection = new Collection('SPANISH');
        this.collection.add(new Card('ser', 'to be (trait)'));
        this.collection.add(new Card('estar', 'to be (state, position)'));

        this.next();
    }

    next() {
        this.card = this.collection.nextCard();
    }
}
