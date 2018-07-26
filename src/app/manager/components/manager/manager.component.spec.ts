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
import {PapaParseModule} from 'ngx-papaparse';
import {EditComponent} from '../edit/edit.component';


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
                FormsModule,
                PapaParseModule
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

    it('should reflect input changes to the name', fakeAsync(() => {
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('#name');

        element.value = 'new name';
        element.dispatchEvent(new Event('input'));
        tick();

        expect(component.collection.name).toBe('new name');
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

        expect(component.collection.size()).toBe(4);
    });

    it('should remove card from collection when the event is emitted', () => {
        fixture.detectChanges();

        fixture.debugElement.query(By.directive(EditStubComponent)).componentInstance.deleted.emit();

        expect(component.collection.size()).toBe(2);
    });

    it('should have a delete button', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#delete').innerText).toEqual('Delete Collection');
    });

    it('should delete the collection through the service when pressing the button', () => {
        const collectionService: CollectionsStubService = TestBed.get(CollectionsService);
        spyOn(collectionService, 'deleteCollection');
        fixture.detectChanges();

        fixture.nativeElement.querySelector('#delete').click();

        expect(collectionService.deleteCollection).toHaveBeenCalledWith(1);
    });

    it('should navigate back home when pressing the delete button', () => {
        spyOn(component.router, 'navigate');
        fixture.detectChanges();

        fixture.nativeElement.querySelector('#delete').click();

        expect(component.router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should display an additional edit component with the skeleton flag set', () => {
        fixture.detectChanges();

        const elements = fixture.debugElement.queryAll(By.directive(EditStubComponent));
        expect(elements.length).toBe(3);
        expect(elements[2].componentInstance.skeleton).toBe(true);
    });

    it('should not set the skeleton flag on the other edit components', () => {
        fixture.detectChanges();

        const elements = fixture.debugElement.queryAll(By.directive(EditStubComponent));
        expect(elements[0].componentInstance.skeleton).toBe(false);
        expect(elements[0].componentInstance.skeleton).toBe(false);
    });

    it('should add a skeleton card instance when receiving the created event', () => {
        fixture.detectChanges();

        fixture.debugElement.query(By.directive(EditStubComponent)).componentInstance.created.emit();

        expect(component.collection.size()).toBe(4);
    });

    it('should remove the skeleton card from the collection when exiting the component', () => {
        fixture.detectChanges();

        component.ngOnDestroy();

        expect(component.collection.size()).toBe(2);
    });
});


@Component({selector: 'app-edit', template: ''})
class EditStubComponent {
    @Input() card: Card;
    @Input() skeleton: boolean;
    @Output() deleted = new EventEmitter<void>();
    @Output() created = new EventEmitter<void>();
}

@Injectable()
class CollectionsStubService {

    collection: Collection;

    constructor() {
        this.collection = new Collection(1, 'SPANISH');
        this.collection.add(new Card('ser', 'to be (trait)'));
        this.collection.add(new Card('estar', 'to be (state, location)'));
        // remember the skeleton card stub (third item)
    }

    getCollection(): Collection {
        return this.collection;
    }

    deleteCollection() {}
}
