import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ManagerComponent} from './components/manager/manager.component';

const managerRoutes: Routes = [
    {
        path: 'manage/:id',
        component: ManagerComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(managerRoutes)
    ],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
