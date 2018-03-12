import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Tracing } from './tracing.model';
import { TracingPopupService } from './tracing-popup.service';
import { TracingService } from './tracing.service';
import { MO, MOService } from '../m-o';
import { Line, LineService } from '../line';
import { WS, WSService } from '../w-s';
import { MOProduct, MOProductService } from '../m-o-product';
import { MOCustomProduct, MOCustomProductService } from '../m-o-custom-product';
import { Delay, DelayService } from '../delay';

@Component({
    selector: 'jhi-tracing-dialog',
    templateUrl: './tracing-dialog.component.html'
})
export class TracingDialogComponent implements OnInit {

    tracing: Tracing;
    authorities: any[];
    isSaving: boolean;

    mos: MO[];

    lines: Line[];

    ws: WS[];

    nextws: WS[];

    prevws: WS[];

    moproducts: MOProduct[];

    mocustomproducts: MOCustomProduct[];

    nexttracings: Tracing[];

    prevtracings: Tracing[];

    delays: Delay[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private tracingService: TracingService,
        private mOService: MOService,
        private lineService: LineService,
        private wSService: WSService,
        private mOProductService: MOProductService,
        private mOCustomProductService: MOCustomProductService,
        private delayService: DelayService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tracing']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.mOService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.mO || !this.tracing.mO.id) {
                this.mos = res.json();
            } else {
                this.mOService.find(this.tracing.mO.id).subscribe((subRes: MO) => {
                    this.mos = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.lineService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.line || !this.tracing.line.id) {
                this.lines = res.json();
            } else {
                this.lineService.find(this.tracing.line.id).subscribe((subRes: Line) => {
                    this.lines = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.wSService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.wS || !this.tracing.wS.id) {
                this.ws = res.json();
            } else {
                this.wSService.find(this.tracing.wS.id).subscribe((subRes: WS) => {
                    this.ws = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.wSService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.nextWS || !this.tracing.nextWS.id) {
                this.nextws = res.json();
            } else {
                this.wSService.find(this.tracing.nextWS.id).subscribe((subRes: WS) => {
                    this.nextws = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.wSService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.prevWS || !this.tracing.prevWS.id) {
                this.prevws = res.json();
            } else {
                this.wSService.find(this.tracing.prevWS.id).subscribe((subRes: WS) => {
                    this.prevws = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.mOProductService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.mOProduct || !this.tracing.mOProduct.id) {
                this.moproducts = res.json();
            } else {
                this.mOProductService.find(this.tracing.mOProduct.id).subscribe((subRes: MOProduct) => {
                    this.moproducts = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.mOCustomProductService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.mOCustomProduct || !this.tracing.mOCustomProduct.id) {
                this.mocustomproducts = res.json();
            } else {
                this.mOCustomProductService.find(this.tracing.mOCustomProduct.id).subscribe((subRes: MOCustomProduct) => {
                    this.mocustomproducts = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.tracingService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.nextTracing || !this.tracing.nextTracing.id) {
                this.nexttracings = res.json();
            } else {
                this.tracingService.find(this.tracing.nextTracing.id).subscribe((subRes: Tracing) => {
                    this.nexttracings = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.tracingService.query({filter: 'tracing-is-null'}).subscribe((res: Response) => {
            if (!this.tracing.prevTracing || !this.tracing.prevTracing.id) {
                this.prevtracings = res.json();
            } else {
                this.tracingService.find(this.tracing.prevTracing.id).subscribe((subRes: Tracing) => {
                    this.prevtracings = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.delayService.query().subscribe(
            (res: Response) => { this.delays = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.tracing.id !== undefined) {
            this.tracingService.update(this.tracing)
                .subscribe((res: Tracing) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.tracingService.create(this.tracing)
                .subscribe((res: Tracing) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Tracing) {
        this.eventManager.broadcast({ name: 'tracingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackMOById(index: number, item: MO) {
        return item.id;
    }

    trackLineById(index: number, item: Line) {
        return item.id;
    }

    trackWSById(index: number, item: WS) {
        return item.id;
    }

    trackMOProductById(index: number, item: MOProduct) {
        return item.id;
    }

    trackMOCustomProductById(index: number, item: MOCustomProduct) {
        return item.id;
    }

    trackTracingById(index: number, item: Tracing) {
        return item.id;
    }

    trackDelayById(index: number, item: Delay) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-tracing-popup',
    template: ''
})
export class TracingPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tracingPopupService: TracingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.tracingPopupService
                    .open(TracingDialogComponent, params['id']);
            } else {
                this.modalRef = this.tracingPopupService
                    .open(TracingDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
