import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { WSConfiguration } from './ws-configuration.model';
import { WSConfigurationPopupService } from './ws-configuration-popup.service';
import { WSConfigurationService } from './ws-configuration.service';

@Component({
    selector: 'jhi-ws-configuration-delete-dialog',
    templateUrl: './ws-configuration-delete-dialog.component.html'
})
export class WSConfigurationDeleteDialogComponent {

    wSConfiguration: WSConfiguration;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private wSConfigurationService: WSConfigurationService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['wSConfiguration']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.wSConfigurationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'wSConfigurationListModification',
                content: 'Deleted an wSConfiguration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ws-configuration-delete-popup',
    template: ''
})
export class WSConfigurationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private wSConfigurationPopupService: WSConfigurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.wSConfigurationPopupService
                .open(WSConfigurationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
