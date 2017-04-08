import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WSConfiguration } from './ws-configuration.model';
import { WSConfigurationService } from './ws-configuration.service';
@Injectable()
export class WSConfigurationPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private wSConfigurationService: WSConfigurationService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.wSConfigurationService.find(id).subscribe(wSConfiguration => {
                this.wSConfigurationModalRef(component, wSConfiguration);
            });
        } else {
            return this.wSConfigurationModalRef(component, new WSConfiguration());
        }
    }

    wSConfigurationModalRef(component: Component, wSConfiguration: WSConfiguration): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.wSConfiguration = wSConfiguration;
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
