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
