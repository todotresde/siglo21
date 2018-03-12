import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { STAttribute } from './st-attribute.model';
import { STAttributeService } from './st-attribute.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-st-attribute',
    templateUrl: './st-attribute.component.html'
})
export class STAttributeComponent implements OnInit, OnDestroy {
sTAttributes: STAttribute[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sTAttributeService: STAttributeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sTAttributeService.query().subscribe(
            (res: HttpResponse<STAttribute[]>) => {
                this.sTAttributes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSTAttributes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: STAttribute) {
        return item.id;
    }
    registerChangeInSTAttributes() {
        this.eventSubscriber = this.eventManager.subscribe('sTAttributeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
