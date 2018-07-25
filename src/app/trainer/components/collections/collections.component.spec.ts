import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CollectionsComponent} from './collections.component';

describe('CollectionsComponent', () => {

    let fixture: ComponentFixture<CollectionsComponent>;
    let component: CollectionsComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CollectionsComponent
            ],
            imports: []
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(CollectionsComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));
});
