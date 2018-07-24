import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainerComponent} from './components/trainer/trainer.component';

const trainerRoutes: Routes = [
    {
        path: 'train',
        component: TrainerComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(trainerRoutes)
    ],
    exports: [RouterModule]
})
export class TrainerRoutingModule { }
