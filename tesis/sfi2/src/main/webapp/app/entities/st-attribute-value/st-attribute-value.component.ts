import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { STAttributeValue } from './st-attribute-value.model';
import { STAttributeValueService } from './st-attribute-value.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-st-attribute-value',
    templateUrl: './st-attribute-value.component.html'
})
export class STAttributeValueComponent implements OnInit, OnDestroy {
sTAttributeValues: STAttributeValue[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sTAttributeValueService: STAttributeValueService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sTAttributeValueService.query().subscribe(
            (res: HttpResponse<STAttributeValue[]>) => {
                this.sTAttributeValues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSTAttributeValues();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: STAttributeValue) {
        return item.id;
    }
    registerChangeInSTAttributeValues() {
        this.eventSubscriber = this.eventManager.subscribe('sTAttributeValueListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
