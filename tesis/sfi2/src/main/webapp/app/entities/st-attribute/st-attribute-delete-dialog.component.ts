import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { STAttribute } from './st-attribute.model';
import { STAttributePopupService } from './st-attribute-popup.service';
import { STAttributeService } from './st-attribute.service';

@Component({
    selector: 'jhi-st-attribute-delete-dialog',
    templateUrl: './st-attribute-delete-dialog.component.html'
})
export class STAttributeDeleteDialogComponent {

    sTAttribute: STAttribute;

    constructor(
        private sTAttributeService: STAttributeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sTAttributeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sTAttributeListModification',
                content: 'Deleted an sTAttribute'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-st-attribute-delete-popup',
    template: ''
})
export class STAttributeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sTAttributePopupService: STAttributePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sTAttributePopupService
                .open(STAttributeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
