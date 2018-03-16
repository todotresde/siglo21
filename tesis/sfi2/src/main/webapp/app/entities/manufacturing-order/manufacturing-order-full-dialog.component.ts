import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderPopupService } from './manufacturing-order-popup.service';
import { ManufacturingOrderService } from './manufacturing-order.service';
import { Product } from '../product/product.model';
import { Supply } from '../supply/supply.model';
import { SupplyService } from '../supply/supply.service';
import { SupplyType } from '../supply-type/supply-type.model';
import { SupplyTypeService } from '../supply-type/supply-type.service';

@Component({
    selector: 'jhi-manufacturing-order-full-dialog',
    templateUrl: './manufacturing-order-full-dialog.component.html'
})
export class ManufacturingOrderFullDialogComponent implements OnInit {

    manufacturingOrder: ManufacturingOrder;
    isSaving: boolean;
    products: Product[] = [];
    supplies: Supply[];

    constructor(
        public activeModal: NgbActiveModal,
        private manufacturingOrderService: ManufacturingOrderService,
        private eventManager: JhiEventManager,
        private supplyService: SupplyService,
        private supplyTypeService: SupplyTypeService,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.loadSupplies();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.manufacturingOrder.id !== undefined) {
            this.subscribeToSaveResponse(
                this.manufacturingOrderService.update(this.manufacturingOrder));
        } else {
            this.subscribeToSaveResponse(
                this.manufacturingOrderService.create(this.manufacturingOrder));
        }
    }

    addProduct() {
        let product: Product = new Product();
        product.supplies = [];
        this.products.push(product);
        this.addSupply(product);
    }

    addSupply(product: Product) {
        product.supplies.push(new Supply());
    }

    deleteProduct() {

    }

    deleteSupply() {

    }

    onChangeSupply(supplyOptionId: number, supply: Supply) {
        supply = this.supplies.filter((res: Supply) => {return res.id == supplyOptionId;}).pop();

        this.supplyTypeService.find(supply.supplyType.id).subscribe(
            (res: HttpResponse<SupplyType>) => {
                supply.supplyType = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadSupplies() {
        this.supplyService.query().subscribe(
            (res: HttpResponse<Supply[]>) => {
                this.supplies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ManufacturingOrder>>) {
        result.subscribe((res: HttpResponse<ManufacturingOrder>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ManufacturingOrder) {
        this.eventManager.broadcast({ name: 'manufacturingOrderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-manufacturing-order-full-popup',
    template: ''
})
export class ManufacturingOrderFullPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private manufacturingOrderPopupService: ManufacturingOrderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.manufacturingOrderPopupService
                    .open(ManufacturingOrderFullDialogComponent as Component, params['id']);
            } else {
                this.manufacturingOrderPopupService
                    .open(ManufacturingOrderFullDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
