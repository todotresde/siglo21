import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MOCustomProduct } from './mo-custom-product.model';
import { MOCustomProductService } from './mo-custom-product.service';
@Injectable()
export class MOCustomProductPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private mOCustomProductService: MOCustomProductService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.mOCustomProductService.find(id).subscribe(mOCustomProduct => {
                this.mOCustomProductModalRef(component, mOCustomProduct);
            });
        } else {
            return this.mOCustomProductModalRef(component, new MOCustomProduct());
        }
    }

    mOCustomProductModalRef(component: Component, mOCustomProduct: MOCustomProduct): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mOCustomProduct = mOCustomProduct;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
