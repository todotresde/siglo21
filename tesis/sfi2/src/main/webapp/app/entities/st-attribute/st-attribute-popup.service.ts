import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { STAttribute } from './st-attribute.model';
import { STAttributeService } from './st-attribute.service';

@Injectable()
export class STAttributePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sTAttributeService: STAttributeService

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
                this.sTAttributeService.find(id)
                    .subscribe((sTAttributeResponse: HttpResponse<STAttribute>) => {
                        const sTAttribute: STAttribute = sTAttributeResponse.body;
                        this.ngbModalRef = this.sTAttributeModalRef(component, sTAttribute);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sTAttributeModalRef(component, new STAttribute());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sTAttributeModalRef(component: Component, sTAttribute: STAttribute): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sTAttribute = sTAttribute;
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
