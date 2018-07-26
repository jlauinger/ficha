import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RootComponent} from './components/root/root.component';
import {BaseRoutingModule} from './base-routing.module';
import {CollectionsService} from './services/collections/collections.service';
import {LocalStorageService} from './services/local-storage/local-storage.service';

@NgModule({
    declarations: [
        RootComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BaseRoutingModule
    ],
    providers: [
        CollectionsService,
        LocalStorageService
    ]
})
export class BaseModule { }
