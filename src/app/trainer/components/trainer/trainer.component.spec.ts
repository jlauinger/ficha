import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrainerComponent} from './trainer.component';
import {Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';
import {Collection} from '../../../base/models/collection/collection.model';
import {By} from '@angular/platform-browser';
import {CollectionsService} from '../../../base/services/collections/collections.service';


describe('TrainerComponent', () => {

    let fixture: ComponentFixture<TrainerComponent>;
    let component: TrainerComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TrainerComponent,
                CardStubComponent
            ],
            providers: [
                { provide: CollectionsService, useClass: CollectionsStubService }
            ]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(TrainerComponent);
        component = fixture.debugElement.componentInstance;

        component.collection = new Collection('SPANISH');
        component.collection.add(new Card('ser', 'to be (trait)'));
        component.collection.add(new Card('estar', 'to be (state, location)'));
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should display title of current collection in a bold tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('b').innerText).toEqual('SPANISH');
    });

    it('should display the next card when receiving the next event', () => {
        const oldCard = component.card;

        fixture.debugElement.query(By.directive(CardStubComponent)).componentInstance.next.emit();

        expect(component.card).not.toBe(oldCard);
    });
});


@Component({selector: 'app-card', template: ''})
class CardStubComponent {
    @Input() card: Card;
    @Output() next = new EventEmitter<void>();
}

@Injectable()
class CollectionsStubService {
    getCollection() {
        const collection = new Collection('SPANISH');
        collection.add(new Card('ser', 'to be (trait)'));
        return collection;
    }
}
