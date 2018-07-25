import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CollectionsComponent} from './collections.component';
import {Collection} from '../../../base/models/collection/collection.model';
import {Injectable} from '@angular/core';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';


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
                RouterTestingModule
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
});


@Injectable()
class CollectionsStubService {
    getCollections(): Collection[] {
        return [
            new Collection(1, 'Spanish'),
            new Collection(2, 'German')
        ];
    }
}
