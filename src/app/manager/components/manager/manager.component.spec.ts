import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ManagerComponent} from './manager.component';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {Collection} from '../../../base/models/collection/collection.model';
import {Injectable} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';


describe('ManagerComponent', () => {

    let fixture: ComponentFixture<ManagerComponent>;
    let component: ManagerComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ManagerComponent
            ],
            providers: [
                {provide: CollectionsService, useClass: CollectionsStubService}
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(ManagerComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));
});


@Injectable()
class CollectionsStubService {

    collection: Collection;

    constructor() {
        this.collection = new Collection(1, 'SPANISH');
        this.collection.add(new Card('ser', 'to be (trait)'));
        this.collection.add(new Card('estar', 'to be (state, location)'));
    }

    getCollection() {
        return this.collection;
    }
}
