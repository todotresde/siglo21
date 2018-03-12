import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MOProduct } from './mo-product.model';
import { MOProductPopupService } from './mo-product-popup.service';
import { MOProductService } from './mo-product.service';
import { ManufacturingOrder, ManufacturingOrderService } from '../manufacturing-order';
import { Product, ProductService } from '../product';

@Component({
    selector: 'jhi-mo-product-dialog',
    templateUrl: './mo-product-dialog.component.html'
})
export class MOProductDialogComponent implements OnInit {

    mOProduct: MOProduct;
    isSaving: boolean;

    manufacturingorders: ManufacturingOrder[];

    products: Product[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mOProductService: MOProductService,
        private manufacturingOrderService: ManufacturingOrderService,
        private productService: ProductService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.manufacturingOrderService.query()
            .subscribe((res: HttpResponse<ManufacturingOrder[]>) => { this.manufacturingorders = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mOProduct.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mOProductService.update(this.mOProduct));
        } else {
            this.subscribeToSaveResponse(
                this.mOProductService.create(this.mOProduct));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MOProduct>>) {
        result.subscribe((res: HttpResponse<MOProduct>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MOProduct) {
        this.eventManager.broadcast({ name: 'mOProductListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackManufacturingOrderById(index: number, item: ManufacturingOrder) {
        return item.id;
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mo-product-popup',
    template: ''
})
export class MOProductPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mOProductPopupService: MOProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mOProductPopupService
                    .open(MOProductDialogComponent as Component, params['id']);
            } else {
                this.mOProductPopupService
                    .open(MOProductDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
