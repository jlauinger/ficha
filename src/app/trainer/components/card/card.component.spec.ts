import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {Card} from '../../../base/models/card/card.model';


describe('CardComponent', () => {

    let fixture: ComponentFixture<CardComponent>;
    let component: CardComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CardComponent
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.debugElement.componentInstance;
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should display the card question', () => {
        component.card = new Card('ser', 'to be (trait)');

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div').innerText).toEqual('ser');
    });
});
