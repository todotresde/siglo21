import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MOProduct } from './mo-product.model';
import { MOProductService } from './mo-product.service';
@Injectable()
export class MOProductPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private mOProductService: MOProductService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.mOProductService.find(id).subscribe(mOProduct => {
                this.mOProductModalRef(component, mOProduct);
            });
        } else {
            return this.mOProductModalRef(component, new MOProduct());
        }
    }

    mOProductModalRef(component: Component, mOProduct: MOProduct): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mOProduct = mOProduct;
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
