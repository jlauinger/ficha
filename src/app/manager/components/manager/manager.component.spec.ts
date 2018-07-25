import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ManagerComponent} from './manager.component';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {Collection} from '../../../base/models/collection/collection.model';
import {Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';


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
                RouterTestingModule,
                FormsModule
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

    it('should display the collection name in an input field', fakeAsync(() => {
        fixture.detectChanges();
        tick();

        expect(fixture.nativeElement.querySelector('input#name').value).toBe('SPANISH');
    }));

    it('should have an exit button', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#exit').innerText).toEqual('Back');
    });

    it('should have a button to add a new card', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#add').innerText).toEqual('Add A Card');
    });

    it('should add a card to the collection when pressing the button', () => {
        fixture.detectChanges();

        fixture.nativeElement.querySelector('#add').click();

        expect(component.collection.size()).toBe(3);
    });

    it('should remove card from collection when the event is emitted', () => {
        fixture.detectChanges();

        fixture.debugElement.query(By.directive(EditStubComponent)).componentInstance.deleted.emit();

        expect(component.collection.size()).toBe(1);
    });
});


@Component({selector: 'app-edit', template: ''})
class EditStubComponent {
    @Input() card: Card;
    @Output() deleted = new EventEmitter<void>();
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
