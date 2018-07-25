import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ManagerComponent} from './manager.component';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {Collection} from '../../../base/models/collection/collection.model';
import {Component, Injectable, Input} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';


describe('ManagerComponent', () => {

    let fixture: ComponentFixture<ManagerComponent>;
    let component: ManagerComponent;
    let collectionId = '0';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ManagerComponent,
                EditStubComponent
            ],
            providers: [
                { provide: CollectionsService, useClass: CollectionsStubService },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: {
                                get: function() { return collectionId; }
                            }}}}
            ],
            imports: [
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(ManagerComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should request the correct collection from CollectionService', () => {
        const collectionService: CollectionsService = TestBed.get(CollectionsService);
        spyOn(collectionService, 'getCollection').and.callThrough();
        collectionId = '42';

        fixture.detectChanges();

        expect(collectionService.getCollection).toHaveBeenCalledWith(42);
    });

    it('should display the collection name', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#name').innerText).toBe('SPANISH');
    });

    it('should have an exit button', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#exit').innerText).toEqual('Back');
    });
});


@Component({selector: 'app-edit', template: ''})
class EditStubComponent {
    @Input() card: Card;
}

@Injectable()
class CollectionsStubService {

    collection: Collection;

    constructor() {
        this.collection = new Collection(1, 'SPANISH');
        this.collection.add(new Card('ser', 'to be (trait)'));
        this.collection.add(new Card('estar', 'to be (state, location)'));
    }

    getCollection(): Collection {
        return this.collection;
    }
}
