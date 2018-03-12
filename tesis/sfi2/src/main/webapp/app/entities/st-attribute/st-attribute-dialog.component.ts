import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { STAttribute } from './st-attribute.model';
import { STAttributePopupService } from './st-attribute-popup.service';
import { STAttributeService } from './st-attribute.service';
import { SupplyType, SupplyTypeService } from '../supply-type';

@Component({
    selector: 'jhi-st-attribute-dialog',
    templateUrl: './st-attribute-dialog.component.html'
})
export class STAttributeDialogComponent implements OnInit {

    sTAttribute: STAttribute;
    isSaving: boolean;

    supplytypes: SupplyType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sTAttributeService: STAttributeService,
        private supplyTypeService: SupplyTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.supplyTypeService.query()
            .subscribe((res: HttpResponse<SupplyType[]>) => { this.supplytypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sTAttribute.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sTAttributeService.update(this.sTAttribute));
        } else {
            this.subscribeToSaveResponse(
                this.sTAttributeService.create(this.sTAttribute));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<STAttribute>>) {
        result.subscribe((res: HttpResponse<STAttribute>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: STAttribute) {
        this.eventManager.broadcast({ name: 'sTAttributeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSupplyTypeById(index: number, item: SupplyType) {
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
    selector: 'jhi-st-attribute-popup',
    template: ''
})
export class STAttributePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sTAttributePopupService: STAttributePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sTAttributePopupService
                    .open(STAttributeDialogComponent as Component, params['id']);
            } else {
                this.sTAttributePopupService
                    .open(STAttributeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
