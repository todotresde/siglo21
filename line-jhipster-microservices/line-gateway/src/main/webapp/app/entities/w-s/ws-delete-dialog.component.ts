import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { WS } from './ws.model';
import { WSPopupService } from './ws-popup.service';
import { WSService } from './ws.service';

@Component({
    selector: 'jhi-ws-delete-dialog',
    templateUrl: './ws-delete-dialog.component.html'
})
export class WSDeleteDialogComponent {

    wS: WS;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private wSService: WSService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['wS']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.wSService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'wSListModification',
                content: 'Deleted an wS'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ws-delete-popup',
    template: ''
})
export class WSDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private wSPopupService: WSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.wSPopupService
                .open(WSDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
