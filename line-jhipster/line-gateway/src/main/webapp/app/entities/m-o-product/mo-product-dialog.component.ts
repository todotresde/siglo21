import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { MOProduct } from './mo-product.model';
import { MOProductPopupService } from './mo-product-popup.service';
import { MOProductService } from './mo-product.service';

@Component({
    selector: 'jhi-mo-product-dialog',
    templateUrl: './mo-product-dialog.component.html'
})
export class MOProductDialogComponent implements OnInit {

    mOProduct: MOProduct;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private mOProductService: MOProductService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['mOProduct']);
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
        if (this.mOProduct.id !== undefined) {
            this.mOProductService.update(this.mOProduct)
                .subscribe((res: MOProduct) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.mOProductService.create(this.mOProduct)
                .subscribe((res: MOProduct) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: MOProduct) {
        this.eventManager.broadcast({ name: 'mOProductListModification', content: 'OK'});
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
    selector: 'jhi-mo-product-popup',
    template: ''
})
export class MOProductPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private mOProductPopupService: MOProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.mOProductPopupService
                    .open(MOProductDialogComponent, params['id']);
            } else {
                this.modalRef = this.mOProductPopupService
                    .open(MOProductDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
