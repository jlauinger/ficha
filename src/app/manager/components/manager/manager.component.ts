import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Collection} from '../../../base/models/collection/collection.model';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {Card} from '../../../base/models/card/card.model';
import {PapaParseService} from 'ngx-papaparse';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit, OnDestroy {

    collection: Collection;

    @ViewChild('fileInput') fileInput: ElementRef;
    importFile: File;

    skeletonCard: Card;

    constructor(private route: ActivatedRoute,
                public router: Router,
                private papa: PapaParseService,
                private collectionsService: CollectionsService) {}

    ngOnInit() {
        const collectionId = Number(this.route.snapshot.paramMap.get('id'));
        this.collection = this.collectionsService.getCollection(collectionId);

        // add a skeleton input card at the end
        this.addEmptyCard();
    }

    ngOnDestroy(): void {
        this.collection.remove(this.skeletonCard);
    }

    public addEmptyCard() {
        this.skeletonCard = new Card('', '');
        this.collection.add(this.skeletonCard);
    }

    public deleteCard(card: Card) {
        this.collection.remove(card);
    }

    public deleteCollection() {
        this.collectionsService.deleteCollection(this.collection.id);
        this.router.navigate(['/']);
    }

    public fileChanged(event) {
        this.importFile = event.target.files[0];
    }

    public import() {
        const fileReader = new FileReader();
        fileReader.onload = () => this.parseCsv(fileReader.result);
        fileReader.readAsText(this.importFile);
        this.fileInput.nativeElement.value = '';
    }

    private parseCsv(csv: string) {
        this.papa.parse(csv, {
            complete: (results) => this.importCsvItems(results.data)
        });
    }

    private importCsvItems(items) {
        items.forEach((item) => {
            this.collection.add(new Card(item[0], item[1]));
        });
    }
}
