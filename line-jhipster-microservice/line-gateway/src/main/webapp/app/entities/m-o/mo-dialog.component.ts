import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { MO } from './mo.model';
import { MOPopupService } from './mo-popup.service';
import { MOService } from './mo.service';
import { Line, LineService } from '../line';
import { MOCustomProduct, MOCustomProductService } from '../m-o-custom-product';

@Component({
    selector: 'jhi-mo-dialog',
    templateUrl: './mo-dialog.component.html'
})
export class MODialogComponent implements OnInit {

    mO: MO;
    authorities: any[];
    isSaving: boolean;

    lines: Line[];

    mocustomproducts: MOCustomProduct[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private mOService: MOService,
        private lineService: LineService,
        private mOCustomProductService: MOCustomProductService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['mO']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.lineService.query({filter: 'mo-is-null'}).subscribe((res: Response) => {
            if (!this.mO.line || !this.mO.line.id) {
                this.lines = res.json();
            } else {
                this.lineService.find(this.mO.line.id).subscribe((subRes: Line) => {
                    this.lines = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.mOCustomProductService.query().subscribe(
            (res: Response) => { this.mocustomproducts = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.mO.id !== undefined) {
            this.mOService.update(this.mO)
                .subscribe((res: MO) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.mOService.create(this.mO)
                .subscribe((res: MO) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: MO) {
        this.eventManager.broadcast({ name: 'mOListModification', content: 'OK'});
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

    trackLineById(index: number, item: Line) {
        return item.id;
    }

    trackMOCustomProductById(index: number, item: MOCustomProduct) {
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
    selector: 'jhi-mo-popup',
    template: ''
})
export class MOPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private mOPopupService: MOPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.mOPopupService
                    .open(MODialogComponent, params['id']);
            } else {
                this.modalRef = this.mOPopupService
                    .open(MODialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
