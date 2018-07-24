import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const baseRoutes: Routes = [
    {
        path: '',
        redirectTo: '/train',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(baseRoutes)
    ],
    exports: [RouterModule]
})
export class BaseRoutingModule { }
