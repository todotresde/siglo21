import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PTAttribute } from './pt-attribute.model';
import { PTAttributeService } from './pt-attribute.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-pt-attribute',
    templateUrl: './pt-attribute.component.html'
})
export class PTAttributeComponent implements OnInit, OnDestroy {
pTAttributes: PTAttribute[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pTAttributeService: PTAttributeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.pTAttributeService.query().subscribe(
            (res: HttpResponse<PTAttribute[]>) => {
                this.pTAttributes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPTAttributes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PTAttribute) {
        return item.id;
    }
    registerChangeInPTAttributes() {
        this.eventSubscriber = this.eventManager.subscribe('pTAttributeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
