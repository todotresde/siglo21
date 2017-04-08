import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { MOCustomProduct } from './mo-custom-product.model';
import { MOCustomProductPopupService } from './mo-custom-product-popup.service';
import { MOCustomProductService } from './mo-custom-product.service';
import { MOProduct, MOProductService } from '../m-o-product';

@Component({
    selector: 'jhi-mo-custom-product-dialog',
    templateUrl: './mo-custom-product-dialog.component.html'
})
export class MOCustomProductDialogComponent implements OnInit {

    mOCustomProduct: MOCustomProduct;
    authorities: any[];
    isSaving: boolean;

    moproducts: MOProduct[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private mOCustomProductService: MOCustomProductService,
        private mOProductService: MOProductService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['mOCustomProduct']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.mOProductService.query().subscribe(
            (res: Response) => { this.moproducts = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.mOCustomProduct.id !== undefined) {
            this.mOCustomProductService.update(this.mOCustomProduct)
                .subscribe((res: MOCustomProduct) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.mOCustomProductService.create(this.mOCustomProduct)
                .subscribe((res: MOCustomProduct) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: MOCustomProduct) {
        this.eventManager.broadcast({ name: 'mOCustomProductListModification', content: 'OK'});
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

    trackMOProductById(index: number, item: MOProduct) {
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
    selector: 'jhi-mo-custom-product-popup',
    template: ''
})
export class MOCustomProductPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private mOCustomProductPopupService: MOCustomProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.mOCustomProductPopupService
                    .open(MOCustomProductDialogComponent, params['id']);
            } else {
                this.modalRef = this.mOCustomProductPopupService
                    .open(MOCustomProductDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
