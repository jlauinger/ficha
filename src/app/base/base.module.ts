import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RootComponent} from './components/root/root.component';

@NgModule({
    declarations: [
        RootComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    providers: []
})
export class BaseModule { }
