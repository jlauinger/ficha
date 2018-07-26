import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BaseModule} from '../base/base.module';
import {BrowserModule} from '@angular/platform-browser';
import {ManagerRoutingModule} from './manager-routing.module';
import {ManagerComponent} from './components/manager/manager.component';
import {EditComponent} from './components/edit/edit.component';
import {PapaParseModule} from 'ngx-papaparse';
import {InjectableFileReader} from '../base/helpers/injectable-file-reader/injectable-file-reader.service';

@NgModule({
    declarations: [
        ManagerComponent,
        EditComponent
    ],
    imports: [
        FormsModule,
        AutosizeModule,
        PapaParseModule,
        BrowserModule,
        BrowserAnimationsModule,
        ManagerRoutingModule,
        BaseModule // has to come last due to catch-all route
    ],
    providers: [
        InjectableFileReader
    ]
})
export class ManagerModule { }
