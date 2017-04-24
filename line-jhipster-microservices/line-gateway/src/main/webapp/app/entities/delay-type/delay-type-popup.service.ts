import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DelayType } from './delay-type.model';
import { DelayTypeService } from './delay-type.service';
@Injectable()
export class DelayTypePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private delayTypeService: DelayTypeService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.delayTypeService.find(id).subscribe(delayType => {
                this.delayTypeModalRef(component, delayType);
            });
        } else {
            return this.delayTypeModalRef(component, new DelayType());
        }
    }

    delayTypeModalRef(component: Component, delayType: DelayType): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.delayType = delayType;
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
