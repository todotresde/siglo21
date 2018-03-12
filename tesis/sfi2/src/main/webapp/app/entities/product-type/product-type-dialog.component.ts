import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProductType } from './product-type.model';
import { ProductTypePopupService } from './product-type-popup.service';
import { ProductTypeService } from './product-type.service';
import { PTAttribute, PTAttributeService } from '../pt-attribute';

@Component({
    selector: 'jhi-product-type-dialog',
    templateUrl: './product-type-dialog.component.html'
})
export class ProductTypeDialogComponent implements OnInit {

    productType: ProductType;
    isSaving: boolean;

    ptattributes: PTAttribute[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private productTypeService: ProductTypeService,
        private pTAttributeService: PTAttributeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pTAttributeService.query()
            .subscribe((res: HttpResponse<PTAttribute[]>) => { this.ptattributes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.productType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.productTypeService.update(this.productType));
        } else {
            this.subscribeToSaveResponse(
                this.productTypeService.create(this.productType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProductType>>) {
        result.subscribe((res: HttpResponse<ProductType>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProductType) {
        this.eventManager.broadcast({ name: 'productTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPTAttributeById(index: number, item: PTAttribute) {
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
    selector: 'jhi-product-type-popup',
    template: ''
})
export class ProductTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private productTypePopupService: ProductTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.productTypePopupService
                    .open(ProductTypeDialogComponent as Component, params['id']);
            } else {
                this.productTypePopupService
                    .open(ProductTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
