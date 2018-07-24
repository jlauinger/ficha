import { TestBed, async } from '@angular/core/testing';
import {CardComponent} from './card.component';


describe('CardComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CardComponent
            ],
        }).compileComponents();
    }));

    it('should create', async(() => {
        const fixture = TestBed.createComponent(CardComponent);
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));
});
