import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tracer } from './tracer.model';
import { TracerPopupService } from './tracer-popup.service';
import { TracerService } from './tracer.service';
import { WSConfiguration, WSConfigurationService } from '../ws-configuration';
import { ManufacturingOrder, ManufacturingOrderService } from '../manufacturing-order';
import { MOProduct, MOProductService } from '../mo-product';
import { Line, LineService } from '../line';
import { WorkStation, WorkStationService } from '../work-station';

@Component({
    selector: 'jhi-tracer-start',
    templateUrl: './tracer-start.component.html'
})
export class TracerStartComponent implements OnInit {

    tracer: Tracer;
    isSending: boolean;

    wsconfigurations: WSConfiguration[];

    manufacturingorders: ManufacturingOrder[];

    moproducts: MOProduct[];

    lines: Line[];

    workstations: WorkStation[];

    tracers: Tracer[];

    constructor(
        private datePipe: DatePipe,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private tracerService: TracerService,
        private wSConfigurationService: WSConfigurationService,
        private manufacturingOrderService: ManufacturingOrderService,
        private mOProductService: MOProductService,
        private lineService: LineService,
        private workStationService: WorkStationService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isSending = false;
        this.wSConfigurationService.query().subscribe(
            (res: HttpResponse<WSConfiguration[]>) => {
                this.wsconfigurations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.manufacturingOrderService.query().subscribe(
            (res: HttpResponse<ManufacturingOrder[]>) => {
                this.manufacturingorders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.mOProductService.query().subscribe(
            (res: HttpResponse<MOProduct[]>) => {
                this.moproducts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.lineService.query().subscribe(
            (res: HttpResponse<Line[]>) => {
                this.lines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.workStationService.query().subscribe(
            (res: HttpResponse<WorkStation[]>) => {
                this.workstations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.tracerService.query().subscribe(
            (res: HttpResponse<Tracer[]>) => {
                this.tracers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        /*
        this.wSConfigurationService.query()
            .subscribe((res: ResponseWrapper) => { this.wsconfigurations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.manufacturingOrderService.query()
            .subscribe((res: ResponseWrapper) => { this.manufacturingorders = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.mOProductService.query()
            .subscribe((res: ResponseWrapper) => { this.moproducts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.lineService.query()
            .subscribe((res: ResponseWrapper) => { this.lines = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.workStationService.query()
            .subscribe((res: ResponseWrapper) => { this.workstations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tracerService.query()
            .subscribe((res: ResponseWrapper) => { this.tracers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        */
        this.tracer.startTime = this.datePipe
                        .transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    send() {
        this.isSending = true;
        this.tracer.endTime = this.datePipe
                        .transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');
        this.subscribeToSendResponse(
                this.tracerService.send(this.tracer));
    }

    private subscribeToSendResponse(result: Observable<Tracer>) {
        result.subscribe((res: Tracer) =>
            this.onSendSuccess(res), (res: Response) => this.onSendError(res));
    }

    private onSendSuccess(result: Tracer) {
        this.eventManager.broadcast({ name: 'tracerListModification', content: 'OK'});
        this.isSending = false;
        this.activeModal.dismiss(result);
    }

    private onSendError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSending = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackWSConfigurationById(index: number, item: WSConfiguration) {
        return item.id;
    }

    trackManufacturingOrderById(index: number, item: ManufacturingOrder) {
        return item.id;
    }

    trackMOProductById(index: number, item: MOProduct) {
        return item.id;
    }

    trackLineById(index: number, item: Line) {
        return item.id;
    }

    trackWorkStationById(index: number, item: WorkStation) {
        return item.id;
    }

    trackTracerById(index: number, item: Tracer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tracer-popup',
    template: ''
})
export class TracerStartPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tracerPopupService: TracerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tracerPopupService
                    .open(TracerStartComponent as Component, params['id']);
            } else {
                this.tracerPopupService
                    .open(TracerStartComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
