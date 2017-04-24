import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Tracing } from './tracing.model';
import { TracingPopupService } from './tracing-popup.service';
import { TracingService } from './tracing.service';

@Component({
    selector: 'jhi-tracing-delete-dialog',
    templateUrl: './tracing-delete-dialog.component.html'
})
export class TracingDeleteDialogComponent {

    tracing: Tracing;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tracingService: TracingService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tracing']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.tracingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tracingListModification',
                content: 'Deleted an tracing'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tracing-delete-popup',
    template: ''
})
export class TracingDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tracingPopupService: TracingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.tracingPopupService
                .open(TracingDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
