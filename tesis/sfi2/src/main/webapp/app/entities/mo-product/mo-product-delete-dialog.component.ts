import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MOProduct } from './mo-product.model';
import { MOProductPopupService } from './mo-product-popup.service';
import { MOProductService } from './mo-product.service';

@Component({
    selector: 'jhi-mo-product-delete-dialog',
    templateUrl: './mo-product-delete-dialog.component.html'
})
export class MOProductDeleteDialogComponent {

    mOProduct: MOProduct;

    constructor(
        private mOProductService: MOProductService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mOProductService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mOProductListModification',
                content: 'Deleted an mOProduct'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mo-product-delete-popup',
    template: ''
})
export class MOProductDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mOProductPopupService: MOProductPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mOProductPopupService
                .open(MOProductDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
