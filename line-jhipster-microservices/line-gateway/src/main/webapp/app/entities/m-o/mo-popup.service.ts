import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MO } from './mo.model';
import { MOService } from './mo.service';
@Injectable()
export class MOPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private mOService: MOService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.mOService.find(id).subscribe(mO => {
                if (mO.date) {
                    mO.date = {
                        year: mO.date.getFullYear(),
                        month: mO.date.getMonth() + 1,
                        day: mO.date.getDate()
                    };
                }
                this.mOModalRef(component, mO);
            });
        } else {
            return this.mOModalRef(component, new MO());
        }
    }

    mOModalRef(component: Component, mO: MO): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mO = mO;
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
