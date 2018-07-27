import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Collection} from '../../../base/models/collection/collection.model';
import {CollectionsService} from '../../../base/services/collections/collections.service';
import {Card} from '../../../base/models/card/card.model';
import {PapaParseService} from 'ngx-papaparse';
import * as FileSaver from 'file-saver';
import {InjectableFileReader} from '../../../base/helpers/injectable-file-reader/injectable-file-reader.service';

@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit, OnDestroy {

    collection: Collection = new Collection('', '');

    @ViewChild('fileInput') fileInput: ElementRef;
    importFile: File;
    showFileInputError = false;

    skeletonCard: Card;

    constructor(private route: ActivatedRoute,
                public router: Router,
                public reader: InjectableFileReader,
                private papa: PapaParseService,
                private collectionsService: CollectionsService) {}

    ngOnInit() {
        const collectionId = this.route.snapshot.paramMap.get('id');
        this.collectionsService.getCollection(collectionId).subscribe((collection) => {
            this.collection = collection;
        });

        // add a skeleton input card at the end
        this.addEmptyCard();
    }

    ngOnDestroy(): void {
        this.collection.remove(this.skeletonCard);
        this.collectionsService.persist();
    }

    public addEmptyCard() {
        this.skeletonCard = new Card('', '');
        this.collection.add(this.skeletonCard);
    }

    public deleteCard(card: Card) {
        this.collection.remove(card);
    }

    public deleteCollection() {
        this.collectionsService.deleteLocalCollection(this.collection.id);
        this.navigateHome();
    }

    public exit() {
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

    public export() {
        const csv = this.exportCsv();
        const file = new File([csv], this.collection.name + '.csv',
            { type: 'text/csv;charset=utf-8' });
        FileSaver.saveAs(file);
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

    private exportCsv(): string {
        this.collection.remove(this.skeletonCard);
        const data = this.collection.cards.map((card: Card) => {
            return [card.question, card.solution];
        });
        // re-add the skeleton input card
        this.addEmptyCard();

        return this.papa.unparse(data, { newline: '\n' });
    }

    private navigateHome() {
        this.router.navigate(['/']);
    }
}
