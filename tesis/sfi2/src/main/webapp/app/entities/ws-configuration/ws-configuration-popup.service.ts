import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { WSConfiguration } from './ws-configuration.model';
import { WSConfigurationService } from './ws-configuration.service';

@Injectable()
export class WSConfigurationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private wSConfigurationService: WSConfigurationService

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
                this.wSConfigurationService.find(id)
                    .subscribe((wSConfigurationResponse: HttpResponse<WSConfiguration>) => {
                        const wSConfiguration: WSConfiguration = wSConfigurationResponse.body;
                        this.ngbModalRef = this.wSConfigurationModalRef(component, wSConfiguration);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.wSConfigurationModalRef(component, new WSConfiguration());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    wSConfigurationModalRef(component: Component, wSConfiguration: WSConfiguration): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.wSConfiguration = wSConfiguration;
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
