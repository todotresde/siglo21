import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { MOCustomProduct } from './mo-custom-product.model';
import { MOCustomProductPopupService } from './mo-custom-product-popup.service';
import { MOCustomProductService } from './mo-custom-product.service';

@Component({
    selector: 'jhi-mo-custom-product-delete-dialog',
    templateUrl: './mo-custom-product-delete-dialog.component.html'
})
export class MOCustomProductDeleteDialogComponent {

    mOCustomProduct: MOCustomProduct;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private mOCustomProductService: MOCustomProductService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['mOCustomProduct']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.mOCustomProductService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mOCustomProductListModification',
                content: 'Deleted an mOCustomProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mo-custom-product-delete-popup',
    template: ''
})
export class MOCustomProductDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private mOCustomProductPopupService: MOCustomProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.mOCustomProductPopupService
                .open(MOCustomProductDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
