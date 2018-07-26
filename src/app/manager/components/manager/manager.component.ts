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
    showFileInputError = false;

    skeletonCard: Card;

    constructor(private route: ActivatedRoute,
                public router: Router,
                public reader: FileReader,
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
        this.showFileInputError = false;
    }

    public getFileInputLabelText() {
        return this.fileInput.nativeElement.files.length > 0
            ? this.fileInput.nativeElement.files[0].name
            : 'Choose a file...';
    }

    public import() {
        if (!this.importFile) {
            this.showFileInputError = true;
            return;
        }

        this.reader.onload = () => this.parseCsv(this.reader.result);
        this.reader.readAsText(this.importFile);
        this.fileInput.nativeElement.value = '';
    }

    private parseCsv(csv: string) {
        this.papa.parse(csv, {
            complete: (results) => this.importCsvItems(results.data)
        });
    }

    private importCsvItems(items) {
        this.collection.remove(this.skeletonCard);
        items.forEach((item) => {
            if (item[0].length === 0 || typeof item[1] === 'undefined' || item[1].length === 0) {
                return;
            }
            this.collection.add(new Card(item[0], item[1]));
        });
        // re-add the skeleton input card
        this.addEmptyCard();
    }
}
