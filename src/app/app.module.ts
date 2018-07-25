import {NgModule} from '@angular/core';

import {RootComponent} from './base/components/root/root.component';
import {TrainerModule} from './trainer/trainer.module';
import {BaseModule} from './base/base.module';
import {ManagerModule} from './manager/manager.module';

@NgModule({
    declarations: [],
    imports: [
        TrainerModule,
        ManagerModule,
        BaseModule // has to come last due to catch-all route
    ],
    providers: [],
    bootstrap: [RootComponent]
})
export class AppModule { }
