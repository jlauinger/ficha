import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RootComponent} from './root.component';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';


describe('RootComponent', () => {

    let fixture: ComponentFixture<RootComponent>;
    let component: RootComponent;
    let element: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RootComponent
            ],
            providers: [
                { provide: Router, useClass: class {} }
            ],
            imports: [
                RouterTestingModule
            ]
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

    it('should display a link to the Github repository', () => {
        expect(element.querySelector('footer a').href).toBe('https://github.com/jlauinger/ficha');
    });
});
