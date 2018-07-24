import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './base/components/root/root.component';

@NgModule({
    declarations: [
        RootComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [RootComponent]
})
export class AppModule { }
