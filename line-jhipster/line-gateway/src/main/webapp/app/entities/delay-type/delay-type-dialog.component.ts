import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { DelayType } from './delay-type.model';
import { DelayTypePopupService } from './delay-type-popup.service';
import { DelayTypeService } from './delay-type.service';

@Component({
    selector: 'jhi-delay-type-dialog',
    templateUrl: './delay-type-dialog.component.html'
})
export class DelayTypeDialogComponent implements OnInit {

    delayType: DelayType;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private delayTypeService: DelayTypeService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['delayType']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.delayType.id !== undefined) {
            this.delayTypeService.update(this.delayType)
                .subscribe((res: DelayType) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.delayTypeService.create(this.delayType)
                .subscribe((res: DelayType) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: DelayType) {
        this.eventManager.broadcast({ name: 'delayTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-delay-type-popup',
    template: ''
})
export class DelayTypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private delayTypePopupService: DelayTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.delayTypePopupService
                    .open(DelayTypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.delayTypePopupService
                    .open(DelayTypeDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
