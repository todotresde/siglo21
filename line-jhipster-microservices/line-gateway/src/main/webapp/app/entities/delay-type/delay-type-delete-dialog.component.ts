import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { DelayType } from './delay-type.model';
import { DelayTypePopupService } from './delay-type-popup.service';
import { DelayTypeService } from './delay-type.service';

@Component({
    selector: 'jhi-delay-type-delete-dialog',
    templateUrl: './delay-type-delete-dialog.component.html'
})
export class DelayTypeDeleteDialogComponent {

    delayType: DelayType;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private delayTypeService: DelayTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['delayType']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.delayTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'delayTypeListModification',
                content: 'Deleted an delayType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delay-type-delete-popup',
    template: ''
})
export class DelayTypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private delayTypePopupService: DelayTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.delayTypePopupService
                .open(DelayTypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
