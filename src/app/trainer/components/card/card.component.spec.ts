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

        component.card = new Card('question', 'correct solution');
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should display the card question', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#question').innerText).toEqual('question');
    });

    it('should display a text box to solution and a submit button', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('textarea#answer')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('button#check').innerText).toBe('View Answer');
    });

    it('should show a message when clicking check with a wrong solution', fakeAsync(() => {
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('#answer');
        element.value = 'wrong solution';
        element.dispatchEvent(new Event('input'));
        tick();

        fixture.nativeElement.querySelector('#check').click();
        tick();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#result').innerText).toContain('Wrong solution!');
    }));

    it('should emit an event when clicking check with the correct solution', fakeAsync(() => {
        fixture.detectChanges();
        const element = fixture.nativeElement.querySelector('#answer');
        element.value = 'correct solution';
        element.dispatchEvent(new Event('input'));
        spyOn(component.next, 'emit');
        tick();

        fixture.nativeElement.querySelector('#check').click();
        tick();

        expect(component.next.emit).toHaveBeenCalled();
    }));

    it('should show the solution after clicking check', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#solution').hasAttribute('hidden')).toEqual(true);

        fixture.nativeElement.querySelector('#check').click();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#solution').innerText).toBe('correct solution');
        expect(fixture.nativeElement.querySelector('#solution').hasAttribute('hidden')).toEqual(false);
    });

    it('should display a skip button', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('button#skip').innerText).toBe('Skip');
    });

    it('should emit a next event when clicking skip', fakeAsync(() => {
        spyOn(component.next, 'emit');

        fixture.nativeElement.querySelector('#skip').click();
        tick();

        expect(component.next.emit).toHaveBeenCalled();
    }));

    it('should reset to question state when the card changes', () => {
        component.showAnswer = true;
        component.answer = '42';

        component.card = new Card('ser', 'to be (trait)');

        expect(component.showAnswer).toBe(false);
        expect(component.answer).toBe('');
        expect(component.result).toBe('');
    });

    it('should show two buttons mark correct and wrong after clicking check', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#markcorrect').hasAttribute('hidden')).toEqual(true);
        expect(fixture.nativeElement.querySelector('#markwrong').hasAttribute('hidden')).toEqual(true);

        fixture.nativeElement.querySelector('#check').click();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#check').hasAttribute('hidden')).toEqual(true);
        expect(fixture.nativeElement.querySelector('#markcorrect').hasAttribute('hidden')).toEqual(false);
        expect(fixture.nativeElement.querySelector('#markwrong').hasAttribute('hidden')).toEqual(false);
    });

    it('should emit next when clicking the button mark correct', fakeAsync(() => {
        component.showAnswer = true;
        fixture.detectChanges();
        spyOn(component.next, 'emit');

        fixture.nativeElement.querySelector('#markcorrect').click();
        tick();

        expect(component.next.emit).toHaveBeenCalled();
    }));

    it('should emit next when clicking the button mark wrong', fakeAsync(() => {
        component.showAnswer = true;
        fixture.detectChanges();
        spyOn(component.next, 'emit');

        fixture.nativeElement.querySelector('#markwrong').click();
        tick();

        expect(component.next.emit).toHaveBeenCalled();
    }));
});
