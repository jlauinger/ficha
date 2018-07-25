import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css']
})
export class RootComponent {

    title = 'Ficha: Learn anything with cards!';

    date = new Date();
}
