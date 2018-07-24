import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {TrainerComponent} from './trainer.component';
import {Component, Input} from '@angular/core';
import {Card} from '../../../base/models/card/card.model';
import {Collection} from '../../../base/models/collection/collection.model';


describe('TrainerComponent', () => {

    let fixture: ComponentFixture<TrainerComponent>;
    let component: TrainerComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TrainerComponent,
                CardStubComponent
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

    it('should display title of current collection in a bold tag', () => {
        component.collection = new Collection('SPANISH');

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('b').innerText).toEqual('SPANISH');
    });
});


@Component({selector: 'app-card', template: ''})
class CardStubComponent {
    @Input() card: Card;
}
