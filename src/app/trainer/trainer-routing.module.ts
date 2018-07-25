import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrainerComponent} from './components/trainer/trainer.component';
import {CollectionsComponent} from './components/collections/collections.component';

const trainerRoutes: Routes = [
    {
        path: '',
        component: CollectionsComponent
    },
    {
        path: 'train/:id',
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
