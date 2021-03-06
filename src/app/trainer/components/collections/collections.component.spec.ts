import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CollectionsComponent} from './collections.component';
import {Collection} from '../../../base/models/collection/collection.model';
import {Injectable} from '@angular/core';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Card} from '../../../base/models/card/card.model';
import {Observable, of} from 'rxjs';


describe('CollectionsComponent', () => {

    let fixture: ComponentFixture<CollectionsComponent>;
    let component: CollectionsComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CollectionsComponent
            ],
            providers: [
                { provide: CollectionsService, useClass: CollectionsStubService }
            ],
            imports: [
                RouterTestingModule,
                FormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(CollectionsComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should display a list with available collections as links', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('a .name')).map(
            (node) => node.nativeElement.innerText))
            .toEqual(['English', 'Spanish', 'German']);
    });

    it('should display a link to train, and one to manage, each collection', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a.train').innerText).toBe('Train');
        expect(fixture.nativeElement.querySelector('a.manage').innerText).toBe('Manage');
    });

    it('should not display a link to train when the collection is empty', () => {
        fixture.detectChanges();
        component.localCollections = [new Collection('1')];

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a.train')).not.toBeTruthy();
    });

    it('should link to manage a collection when the collection is empty', () => {
        fixture.detectChanges();
        component.localCollections = [new Collection('1')];
        component.remoteCollections = of([]);

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a.collection').href).toContain('manage');
    });

    it('should display a button and name input to create a new collection', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('button#new').innerText).toBe('Create New Collection');
        expect(fixture.nativeElement.querySelector('input#newName')).toBeTruthy();
    });

    it('should get a new collection with correct name from the service when pressing the button', fakeAsync(() => {
        fixture.detectChanges();
        const collectionService: CollectionsStubService = TestBed.get(CollectionsService);
        spyOn(collectionService, 'createLocalCollection');
        const element = fixture.nativeElement.querySelector('#newName');
        element.value = 'NEW NAME';
        element.dispatchEvent(new Event('input'));
        tick();

        fixture.nativeElement.querySelector('#new').click();

        expect(collectionService.createLocalCollection).toHaveBeenCalledWith('NEW NAME');
        expect(component.localCollections.length).toBe(3);
    }));

    it('should get a new collection with correct name from the service when pressing return', fakeAsync(() => {
        fixture.detectChanges();
        const collectionService: CollectionsStubService = TestBed.get(CollectionsService);
        spyOn(collectionService, 'createLocalCollection');
        const element = fixture.nativeElement.querySelector('#newName');
        element.value = 'NEW NAME';
        element.dispatchEvent(new Event('input'));
        tick();

        element.dispatchEvent(new KeyboardEvent('keyup', {
            'key': 'enter'
        }));
        tick();

        expect(collectionService.createLocalCollection).toHaveBeenCalledWith('NEW NAME');
        expect(component.localCollections.length).toBe(3);
    }));

    it('should reset new name input after creating the new collection', () => {
        component.newName = 'new name';
        fixture.detectChanges();

        fixture.nativeElement.querySelector('#new').click();

        expect(component.newName).toBe('');
    });
});


@Injectable()
class CollectionsStubService {
    getLocalCollections(): Collection[] {
        const spanish = new Collection('1', 'Spanish');
        const german = new Collection('2', 'German');

        spanish.add(new Card('ser', 'to be (trait)'));

        return [spanish, german];
    }
    getRemoteCollections(): Observable<Collection[]> {
        return of([new Collection('42', 'English')]);
    }
    createLocalCollection() {}
}
