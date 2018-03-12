import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

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
        private wSConfigurationService: WSConfigurationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.wSConfigurationService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private wSConfigurationPopupService: WSConfigurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.wSConfigurationPopupService
                .open(WSConfigurationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
