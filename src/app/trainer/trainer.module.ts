import {NgModule} from '@angular/core';
import {CardComponent} from './components/card/card.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BaseModule} from '../base/base.module';
import {TrainerComponent} from './components/trainer/trainer.component';
import {TrainerRoutingModule} from './trainer-routing.module';
import {FormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';

@NgModule({
    declarations: [
        CardComponent,
        TrainerComponent
    ],
    imports: [
        FormsModule,
        AutosizeModule,
        BrowserModule,
        BrowserAnimationsModule,
        TrainerRoutingModule,
        BaseModule // has to come last due to catch-all route
    ],
    providers: []
})
export class TrainerModule { }
