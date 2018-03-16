import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { STAttributeValue } from './st-attribute-value.model';
import { STAttributeValuePopupService } from './st-attribute-value-popup.service';
import { STAttributeValueService } from './st-attribute-value.service';
import { Product, ProductService } from '../product';
import { Supply, SupplyService } from '../supply';
import { SupplyType, SupplyTypeService } from '../supply-type';
import { STAttribute, STAttributeService } from '../st-attribute';

@Component({
    selector: 'jhi-st-attribute-value-dialog',
    templateUrl: './st-attribute-value-dialog.component.html'
})
export class STAttributeValueDialogComponent implements OnInit {

    sTAttributeValue: STAttributeValue;
    isSaving: boolean;

    products: Product[];

    supplies: Supply[];

    supplytypes: SupplyType[];

    stAttributes: STAttribute[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sTAttributeValueService: STAttributeValueService,
        private productService: ProductService,
        private supplyService: SupplyService,
        private supplyTypeService: SupplyTypeService,
        private stAttributeService: STAttributeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.productService.query()
            .subscribe((res: HttpResponse<Product[]>) => { this.products = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyService.query()
            .subscribe((res: HttpResponse<Supply[]>) => { this.supplies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.supplyTypeService.query()
            .subscribe((res: HttpResponse<SupplyType[]>) => { this.supplytypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.stAttributeService.query()
            .subscribe((res: HttpResponse<STAttribute[]>) => { this.stAttributes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sTAttributeValue.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sTAttributeValueService.update(this.sTAttributeValue));
        } else {
            this.subscribeToSaveResponse(
                this.sTAttributeValueService.create(this.sTAttributeValue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<STAttributeValue>>) {
        result.subscribe((res: HttpResponse<STAttributeValue>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: STAttributeValue) {
        this.eventManager.broadcast({ name: 'sTAttributeValueListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProductById(index: number, item: Product) {
        return item.id;
    }

    trackSupplyById(index: number, item: Supply) {
        return item.id;
    }

    trackSupplyTypeById(index: number, item: SupplyType) {
        return item.id;
    }

    trackSTAttributeById(index: number, item: STAttribute) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-st-attribute-value-popup',
    template: ''
})
export class STAttributeValuePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sTAttributeValuePopupService: STAttributeValuePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sTAttributeValuePopupService
                    .open(STAttributeValueDialogComponent as Component, params['id']);
            } else {
                this.sTAttributeValuePopupService
                    .open(STAttributeValueDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
