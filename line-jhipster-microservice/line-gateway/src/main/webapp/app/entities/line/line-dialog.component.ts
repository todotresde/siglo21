import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Line } from './line.model';
import { LinePopupService } from './line-popup.service';
import { LineService } from './line.service';
import { WSConfiguration, WSConfigurationService } from '../w-s-configuration';

@Component({
    selector: 'jhi-line-dialog',
    templateUrl: './line-dialog.component.html'
})
export class LineDialogComponent implements OnInit {

    line: Line;
    authorities: any[];
    isSaving: boolean;

    wsconfigurations: WSConfiguration[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private lineService: LineService,
        private wSConfigurationService: WSConfigurationService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['line']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.wSConfigurationService.query().subscribe(
            (res: Response) => { this.wsconfigurations = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.line.id !== undefined) {
            this.lineService.update(this.line)
                .subscribe((res: Line) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.lineService.create(this.line)
                .subscribe((res: Line) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Line) {
        this.eventManager.broadcast({ name: 'lineListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackWSConfigurationById(index: number, item: WSConfiguration) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-line-popup',
    template: ''
})
export class LinePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private linePopupService: LinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.linePopupService
                    .open(LineDialogComponent, params['id']);
            } else {
                this.modalRef = this.linePopupService
                    .open(LineDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
