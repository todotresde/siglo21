import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Delay } from './delay.model';
import { DelayPopupService } from './delay-popup.service';
import { DelayService } from './delay.service';

@Component({
    selector: 'jhi-delay-delete-dialog',
    templateUrl: './delay-delete-dialog.component.html'
})
export class DelayDeleteDialogComponent {

    delay: Delay;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private delayService: DelayService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['delay']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.delayService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'delayListModification',
                content: 'Deleted an delay'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delay-delete-popup',
    template: ''
})
export class DelayDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private delayPopupService: DelayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.delayPopupService
                .open(DelayDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
