import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import {Card} from '../../../base/models/card/card.model';
import {EditComponent} from './edit.component';
import {CollectionsService} from '../../../base/services/collections/collections.service';

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
});
