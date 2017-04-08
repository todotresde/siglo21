import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Delay } from './delay.model';
import { DelayService } from './delay.service';
@Injectable()
export class DelayPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private delayService: DelayService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.delayService.find(id).subscribe(delay => {
                if (delay.startDate) {
                    delay.startDate = {
                        year: delay.startDate.getFullYear(),
                        month: delay.startDate.getMonth() + 1,
                        day: delay.startDate.getDate()
                    };
                }
                if (delay.endDate) {
                    delay.endDate = {
                        year: delay.endDate.getFullYear(),
                        month: delay.endDate.getMonth() + 1,
                        day: delay.endDate.getDate()
                    };
                }
                this.delayModalRef(component, delay);
            });
        } else {
            return this.delayModalRef(component, new Delay());
        }
    }

    delayModalRef(component: Component, delay: Delay): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.delay = delay;
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
