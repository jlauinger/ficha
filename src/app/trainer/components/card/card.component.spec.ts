import {TestBed, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {Card} from '../../../base/models/card/card.model';
import {FormsModule} from '@angular/forms';


describe('CardComponent', () => {

    let fixture: ComponentFixture<CardComponent>;
    let component: CardComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CardComponent
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.debugElement.componentInstance;

        component.card = new Card('ser', 'to be (trait)');
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should display the card question', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('div').innerText).toEqual('ser');
    });

    it('should display a text box to answer and a submit button', () => {
        expect(fixture.nativeElement.querySelector('textarea')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('button').innerText).toBe('Check!');
    });

    it('should show a message when clicking check with a wrong answer', fakeAsync(() => {
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('textarea');
        element.value = 'wrong answer';
        element.dispatchEvent(new Event('input'));
        tick();

        fixture.nativeElement.querySelector('button').click();
        tick();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.result').innerText).toContain('Wrong answer!');
    }));

    it('should emit an event when clicking check with the correct answer', fakeAsync(() => {
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('textarea');
        element.value = 'to be (trait)';
        element.dispatchEvent(new Event('input'));
        spyOn(component.next, 'emit');
        tick();

        fixture.nativeElement.querySelector('button').click();
        tick();

        expect(component.next.emit).toHaveBeenCalled();
    }));
});
