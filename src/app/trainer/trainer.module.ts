import {NgModule} from '@angular/core';
import {CardComponent} from './components/card/card.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BaseModule} from '../base/base.module';

@NgModule({
    declarations: [
        CardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BaseModule // has to come last due to catch-all route
    ],
    providers: []
})
export class TrainerModule { }
