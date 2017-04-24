import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Tracing } from './tracing.model';
import { TracingService } from './tracing.service';
@Injectable()
export class TracingPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private tracingService: TracingService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.tracingService.find(id).subscribe(tracing => {
                if (tracing.inTime) {
                    tracing.inTime = {
                        year: tracing.inTime.getFullYear(),
                        month: tracing.inTime.getMonth() + 1,
                        day: tracing.inTime.getDate()
                    };
                }
                if (tracing.startTime) {
                    tracing.startTime = {
                        year: tracing.startTime.getFullYear(),
                        month: tracing.startTime.getMonth() + 1,
                        day: tracing.startTime.getDate()
                    };
                }
                this.tracingModalRef(component, tracing);
            });
        } else {
            return this.tracingModalRef(component, new Tracing());
        }
    }

    tracingModalRef(component: Component, tracing: Tracing): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tracing = tracing;
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
