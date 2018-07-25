import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TrainerComponent} from './trainer.component';
import {Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';
import {Collection} from '../../../base/models/collection/collection.model';
import {By} from '@angular/platform-browser';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {ActivatedRoute} from '@angular/router';


describe('TrainerComponent', () => {

    let fixture: ComponentFixture<TrainerComponent>;
    let component: TrainerComponent;
    let collectionId = '0';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TrainerComponent,
                CardStubComponent
            ],
            providers: [
                { provide: CollectionsService, useClass: CollectionsStubService },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: {
                                get: function() { return collectionId; }
                            }}}}
            ]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(TrainerComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should display title of current collection in a bold tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('b#name').innerText).toEqual('SPANISH');
    });

    it('should display the size and current index of the collection', () => {
        fixture.detectChanges();

        component.next();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#index').innerText).toEqual('2');
        expect(fixture.nativeElement.querySelector('#size').innerText).toEqual('2');
    });

    it('should display the remaining cards', () => {
        fixture.detectChanges();

        component.next();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#remaining').innerText).toEqual('1');
    });

    it('should display the next card when receiving the next event', () => {
        fixture.detectChanges();
        const oldCard = component.card;

        fixture.debugElement.query(By.directive(CardStubComponent)).componentInstance.next.emit();

        expect(component.card).not.toBe(oldCard);
    });

    it('should request the correct collection from CollectionService', () => {
        const collectionService: CollectionsService = TestBed.get(CollectionsService);
        spyOn(collectionService, 'getCollection').and.callThrough();
        collectionId = '42';

        fixture.detectChanges();

        expect(collectionService.getCollection).toHaveBeenCalledWith(42);
    });
});


@Component({selector: 'app-card', template: ''})
class CardStubComponent {
    @Input() card: Card;
    @Output() next = new EventEmitter<void>();
}

@Injectable()
class CollectionsStubService {
    getCollection(collectionId: number) {
        const collection = new Collection('SPANISH');
        collection.add(new Card('ser', 'to be (trait)'));
        collection.add(new Card('estar', 'to be (state, location)'));
        return collection;
    }
}
