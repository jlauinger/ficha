import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RootComponent } from './root.component';
import {CardComponent} from '../../../trainer/components/card/card.component';
import {ElementRef} from '@angular/core';


describe('RootComponent', () => {

    let fixture: ComponentFixture<RootComponent>;
    let component: RootComponent;
    let element: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RootComponent
            ],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(RootComponent);
        component = fixture.debugElement.componentInstance;
        element = fixture.debugElement.nativeElement;
    }));

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should contain ficha, learn and card in the title`, () => {
        expect(component.title.toLowerCase()).toContain('ficha');
        expect(component.title.toLowerCase()).toContain('learn');
        expect(component.title.toLowerCase()).toContain('card');
    });

    it('should render title in a h1 tag', async(() => {
        fixture.detectChanges();
        expect(element.querySelector('h1').textContent).toContain(component.title);
    }));
});
