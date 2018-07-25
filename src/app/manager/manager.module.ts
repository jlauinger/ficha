import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BaseModule} from '../base/base.module';
import {BrowserModule} from '@angular/platform-browser';
import {ManagerRoutingModule} from './manager-routing.module';
import {ManagerComponent} from './components/manager/manager.component';

@NgModule({
    declarations: [
        ManagerComponent
    ],
    imports: [
        FormsModule,
        AutosizeModule,
        BrowserModule,
        BrowserAnimationsModule,
        ManagerRoutingModule,
        BaseModule // has to come last due to catch-all route
    ],
    providers: []
})
export class ManagerModule { }
