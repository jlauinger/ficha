import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CollectionsComponent} from './collections.component';
import {Collection} from '../../../base/models/collection/collection.model';
import {Injectable} from '@angular/core';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {By} from '@angular/platform-browser';


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

    it('should display a list with available collections', () => {
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).map(
            (node) => node.nativeElement.innerText))
            .toEqual(['Spanish', 'German']);
    });
});


@Injectable()
class CollectionsStubService {
    getCollections(): Collection[] {
        return [
            new Collection('Spanish'),
            new Collection('German')
        ];
    }
}
