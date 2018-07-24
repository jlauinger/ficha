import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {TrainerComponent} from './trainer.component';


describe('TrainerComponent', () => {

    let fixture: ComponentFixture<TrainerComponent>;
    let component: TrainerComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TrainerComponent
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(TrainerComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));
});
