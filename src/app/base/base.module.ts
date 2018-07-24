import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RootComponent} from './components/root/root.component';
import {BaseRoutingModule} from './base-routing.module';

@NgModule({
    declarations: [
        RootComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BaseRoutingModule
    ],
    providers: []
})
export class BaseModule { }
