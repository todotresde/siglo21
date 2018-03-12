import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { WSConfiguration } from './ws-configuration.model';
import { WSConfigurationPopupService } from './ws-configuration-popup.service';
import { WSConfigurationService } from './ws-configuration.service';
import { WS, WSService } from '../w-s';
import { Delay, DelayService } from '../delay';

@Component({
    selector: 'jhi-ws-configuration-dialog',
    templateUrl: './ws-configuration-dialog.component.html'
})
export class WSConfigurationDialogComponent implements OnInit {

    wSConfiguration: WSConfiguration;
    authorities: any[];
    isSaving: boolean;

    ws: WS[];

    prevws: WS[];

    nextws: WS[];

    delays: Delay[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private wSConfigurationService: WSConfigurationService,
        private wSService: WSService,
        private delayService: DelayService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['wSConfiguration']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.wSService.query({filter: 'wsconfiguration-is-null'}).subscribe((res: Response) => {
            if (!this.wSConfiguration.wS || !this.wSConfiguration.wS.id) {
                this.ws = res.json();
            } else {
                this.wSService.find(this.wSConfiguration.wS.id).subscribe((subRes: WS) => {
                    this.ws = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.wSService.query({filter: 'wsconfiguration-is-null'}).subscribe((res: Response) => {
            if (!this.wSConfiguration.prevWS || !this.wSConfiguration.prevWS.id) {
                this.prevws = res.json();
            } else {
                this.wSService.find(this.wSConfiguration.prevWS.id).subscribe((subRes: WS) => {
                    this.prevws = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.wSService.query({filter: 'wsconfiguration-is-null'}).subscribe((res: Response) => {
            if (!this.wSConfiguration.nextWS || !this.wSConfiguration.nextWS.id) {
                this.nextws = res.json();
            } else {
                this.wSService.find(this.wSConfiguration.nextWS.id).subscribe((subRes: WS) => {
                    this.nextws = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.delayService.query().subscribe(
            (res: Response) => { this.delays = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.wSConfiguration.id !== undefined) {
            this.wSConfigurationService.update(this.wSConfiguration)
                .subscribe((res: WSConfiguration) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.wSConfigurationService.create(this.wSConfiguration)
                .subscribe((res: WSConfiguration) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: WSConfiguration) {
        this.eventManager.broadcast({ name: 'wSConfigurationListModification', content: 'OK'});
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

    trackWSById(index: number, item: WS) {
        return item.id;
    }

    trackDelayById(index: number, item: Delay) {
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
    selector: 'jhi-ws-configuration-popup',
    template: ''
})
export class WSConfigurationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private wSConfigurationPopupService: WSConfigurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.wSConfigurationPopupService
                    .open(WSConfigurationDialogComponent, params['id']);
            } else {
                this.modalRef = this.wSConfigurationPopupService
                    .open(WSConfigurationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
