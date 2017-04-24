import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { MO } from './mo.model';
import { MOPopupService } from './mo-popup.service';
import { MOService } from './mo.service';

@Component({
    selector: 'jhi-mo-delete-dialog',
    templateUrl: './mo-delete-dialog.component.html'
})
export class MODeleteDialogComponent {

    mO: MO;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private mOService: MOService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['mO']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.mOService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mOListModification',
                content: 'Deleted an mO'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mo-delete-popup',
    template: ''
})
export class MODeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private mOPopupService: MOPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.mOPopupService
                .open(MODeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
