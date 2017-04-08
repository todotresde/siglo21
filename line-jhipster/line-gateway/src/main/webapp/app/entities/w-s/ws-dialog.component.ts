import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { WS } from './ws.model';
import { WSPopupService } from './ws-popup.service';
import { WSService } from './ws.service';

@Component({
    selector: 'jhi-ws-dialog',
    templateUrl: './ws-dialog.component.html'
})
export class WSDialogComponent implements OnInit {

    wS: WS;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private wSService: WSService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['wS']);
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
        if (this.wS.id !== undefined) {
            this.wSService.update(this.wS)
                .subscribe((res: WS) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.wSService.create(this.wS)
                .subscribe((res: WS) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: WS) {
        this.eventManager.broadcast({ name: 'wSListModification', content: 'OK'});
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
    selector: 'jhi-ws-popup',
    template: ''
})
export class WSPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private wSPopupService: WSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.wSPopupService
                    .open(WSDialogComponent, params['id']);
            } else {
                this.modalRef = this.wSPopupService
                    .open(WSDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
