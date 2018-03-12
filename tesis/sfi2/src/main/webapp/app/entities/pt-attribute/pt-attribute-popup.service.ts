import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PTAttribute } from './pt-attribute.model';
import { PTAttributeService } from './pt-attribute.service';

@Injectable()
export class PTAttributePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pTAttributeService: PTAttributeService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.pTAttributeService.find(id)
                    .subscribe((pTAttributeResponse: HttpResponse<PTAttribute>) => {
                        const pTAttribute: PTAttribute = pTAttributeResponse.body;
                        this.ngbModalRef = this.pTAttributeModalRef(component, pTAttribute);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pTAttributeModalRef(component, new PTAttribute());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pTAttributeModalRef(component: Component, pTAttribute: PTAttribute): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pTAttribute = pTAttribute;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
