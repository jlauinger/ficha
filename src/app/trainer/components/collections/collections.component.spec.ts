import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CollectionsComponent} from './collections.component';
import {Collection} from '../../../base/models/collection/collection.model';
import {Injectable} from '@angular/core';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';


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

        expect(fixture.debugElement.queryAll(By.css('li a .name')).map(
            (node) => node.nativeElement.innerText))
            .toEqual(['Spanish', 'German']);
    });

    it('should display a link to train, and one to manage, each collection', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('a.train').innerText).toBe('Train');
        expect(fixture.nativeElement.querySelector('a.manage').innerText).toBe('Manage');
    });

    it('should display a button and name input to create a new collection', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('button#new').innerText).toBe('Create New Collection');
        expect(fixture.nativeElement.querySelector('input#newName')).toBeTruthy();
    });

    it('should get a new collection with correct name from the service when pressing the button', fakeAsync(() => {
        fixture.detectChanges();
        const collectionService: CollectionsStubService = TestBed.get(CollectionsService);
        spyOn(collectionService, 'createCollection');
        const element = fixture.nativeElement.querySelector('#newName');
        element.value = 'NEW NAME';
        element.dispatchEvent(new Event('input'));
        tick();

        fixture.nativeElement.querySelector('#new').click();

        expect(collectionService.createCollection).toHaveBeenCalledWith('NEW NAME');
        expect(component.collections.length).toBe(3);
    }));

    it('should get a new collection with correct name from the service when pressing return', fakeAsync(() => {
        fixture.detectChanges();
        const collectionService: CollectionsStubService = TestBed.get(CollectionsService);
        spyOn(collectionService, 'createCollection');
        const element = fixture.nativeElement.querySelector('#newName');
        element.value = 'NEW NAME';
        element.dispatchEvent(new Event('input'));
        tick();

        element.dispatchEvent(new KeyboardEvent('keyup', {
            'key': 'enter'
        }));
        tick();

        expect(collectionService.createCollection).toHaveBeenCalledWith('NEW NAME');
        expect(component.collections.length).toBe(3);
    }));
});


@Injectable()
class CollectionsStubService {
    getCollections(): Collection[] {
        return [
            new Collection(1, 'Spanish'),
            new Collection(2, 'German')
        ];
    }

    createCollection() {}
}
