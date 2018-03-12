import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PTAttribute } from './pt-attribute.model';
import { PTAttributePopupService } from './pt-attribute-popup.service';
import { PTAttributeService } from './pt-attribute.service';

@Component({
    selector: 'jhi-pt-attribute-delete-dialog',
    templateUrl: './pt-attribute-delete-dialog.component.html'
})
export class PTAttributeDeleteDialogComponent {

    pTAttribute: PTAttribute;

    constructor(
        private pTAttributeService: PTAttributeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pTAttributeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pTAttributeListModification',
                content: 'Deleted an pTAttribute'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pt-attribute-delete-popup',
    template: ''
})
export class PTAttributeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pTAttributePopupService: PTAttributePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pTAttributePopupService
                .open(PTAttributeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
