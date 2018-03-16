import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { STAttributeValue } from './st-attribute-value.model';
import { STAttributeValuePopupService } from './st-attribute-value-popup.service';
import { STAttributeValueService } from './st-attribute-value.service';

@Component({
    selector: 'jhi-st-attribute-value-delete-dialog',
    templateUrl: './st-attribute-value-delete-dialog.component.html'
})
export class STAttributeValueDeleteDialogComponent {

    sTAttributeValue: STAttributeValue;

    constructor(
        private sTAttributeValueService: STAttributeValueService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sTAttributeValueService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sTAttributeValueListModification',
                content: 'Deleted an sTAttributeValue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-st-attribute-value-delete-popup',
    template: ''
})
export class STAttributeValueDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sTAttributeValuePopupService: STAttributeValuePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sTAttributeValuePopupService
                .open(STAttributeValueDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
