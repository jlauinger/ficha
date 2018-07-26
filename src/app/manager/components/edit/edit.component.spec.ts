import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import {Card} from '../../../base/models/card/card.model';
import {EditComponent} from './edit.component';

describe('EditComponent', () => {

    let fixture: ComponentFixture<EditComponent>;
    let component: EditComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EditComponent
            ],
            imports: [
                FormsModule,
                AutosizeModule
            ]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(EditComponent);
        component = fixture.debugElement.componentInstance;

        component.card = new Card('question', 'correct solution');
    }));

    it('should create', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should have input fields for question and solution', fakeAsync(() => {
        fixture.detectChanges();
        tick();

        expect(fixture.nativeElement.querySelector('input#question').value).toBe('question');
        expect(fixture.nativeElement.querySelector('input#solution').value).toBe('correct solution');
    }));

    it('should reflect input field changes to question and solution', fakeAsync(() => {
        fixture.detectChanges();
        const questionElement = fixture.nativeElement.querySelector('#question');
        questionElement.value = 'new question';
        questionElement.dispatchEvent(new Event('input'));
        const solutionElement = fixture.nativeElement.querySelector('#solution');
        solutionElement.value = 'new solution';
        solutionElement.dispatchEvent(new Event('input'));
        tick();

        expect(component.card.question).toBe('new question');
        expect(component.card.solution).toBe('new solution');
    }));

    it('should have a delete button', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('button#delete').innerText).toBe('Delete');
    });

    it('should emit an event when clicking the delete button', fakeAsync(() => {
        spyOn(component.deleted, 'emit');

        fixture.nativeElement.querySelector('#delete').click();
        tick();

        expect(component.deleted.emit).toHaveBeenCalled();
    }));

    it('should not display the delete button when the skeleton flag is set', () => {
        component.skeleton = true;

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('button#delete').hidden).toBe(true);
    });

    it('should display the input fields with dashed border if the skeleton flag is set', () => {
        component.skeleton = true;

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#question').className).toContain('skeleton');
        expect(fixture.nativeElement.querySelector('#solution').className).toContain('skeleton');
    });

    it('should clear the skeleton flag and emit an event when typing a question while skeleton is set', fakeAsync(() => {
        component.skeleton = true;
        const element = fixture.nativeElement.querySelector('#question');
        spyOn(component.created, 'emit');

        const event: any = document.createEvent('CustomEvent');
        event.which = 65; // a
        event.initEvent('keyup', true, true);
        element.dispatchEvent(event);
        tick();

        expect(component.skeleton).toBe(false);
        expect(component.created.emit).toHaveBeenCalled();
    }));

    it('should clear the skeleton flag and emit an event when typing a solution while skeleton is set', fakeAsync(() => {
        component.skeleton = true;
        const element = fixture.nativeElement.querySelector('#solution');
        spyOn(component.created, 'emit');

        const event: any = document.createEvent('CustomEvent');
        event.which = 65; // a
        event.initEvent('keyup', true, true);
        element.dispatchEvent(event);
        tick();

        expect(component.skeleton).toBe(false);
        expect(component.created.emit).toHaveBeenCalled();
    }));

    it('should not emit an event when typing a question but skeleton is not set', fakeAsync(() => {
        component.skeleton = false;
        const element = fixture.nativeElement.querySelector('#question');
        spyOn(component.created, 'emit');

        const event: any = document.createEvent('CustomEvent');
        event.which = 65; // a
        event.initEvent('keyup', true, true);
        element.dispatchEvent(event);
        tick();

        expect(component.created.emit).not.toHaveBeenCalled();
    }));

    it('should not emit an event when typing a solution but skeleton is not set', fakeAsync(() => {
        component.skeleton = false;
        const element = fixture.nativeElement.querySelector('#solution');
        spyOn(component.created, 'emit');

        const event: any = document.createEvent('CustomEvent');
        event.which = 65; // a
        event.initEvent('keyup', true, true);
        element.dispatchEvent(event);
        tick();

        expect(component.created.emit).not.toHaveBeenCalled();
    }));

    it('should not emit an event when typing a non-letter character', fakeAsync(() => {
        component.skeleton = true;
        const element = fixture.nativeElement.querySelector('#solution');
        spyOn(component.created, 'emit');

        const event: any = document.createEvent('CustomEvent');
        event.which = 9; // tab
        event.initEvent('keyup', true, true);
        element.dispatchEvent(event);
        tick();

        expect(component.created.emit).not.toHaveBeenCalled();
    }));

    it('should have a huge tab index on the delete button', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#delete').tabIndex).toBeGreaterThan(9000);
    });
});
