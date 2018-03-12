import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Delay } from './delay.model';
import { DelayPopupService } from './delay-popup.service';
import { DelayService } from './delay.service';
import { DelayType, DelayTypeService } from '../delay-type';

@Component({
    selector: 'jhi-delay-dialog',
    templateUrl: './delay-dialog.component.html'
})
export class DelayDialogComponent implements OnInit {

    delay: Delay;
    authorities: any[];
    isSaving: boolean;

    delaytypes: DelayType[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private delayService: DelayService,
        private delayTypeService: DelayTypeService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['delay']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.delayTypeService.query({filter: 'delay-is-null'}).subscribe((res: Response) => {
            if (!this.delay.delayType || !this.delay.delayType.id) {
                this.delaytypes = res.json();
            } else {
                this.delayTypeService.find(this.delay.delayType.id).subscribe((subRes: DelayType) => {
                    this.delaytypes = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.delay.id !== undefined) {
            this.delayService.update(this.delay)
                .subscribe((res: Delay) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.delayService.create(this.delay)
                .subscribe((res: Delay) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Delay) {
        this.eventManager.broadcast({ name: 'delayListModification', content: 'OK'});
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

    trackDelayTypeById(index: number, item: DelayType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-delay-popup',
    template: ''
})
export class DelayPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private delayPopupService: DelayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.delayPopupService
                    .open(DelayDialogComponent, params['id']);
            } else {
                this.modalRef = this.delayPopupService
                    .open(DelayDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
