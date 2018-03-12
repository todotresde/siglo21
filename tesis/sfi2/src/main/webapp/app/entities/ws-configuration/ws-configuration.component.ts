import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WSConfiguration } from './ws-configuration.model';
import { WSConfigurationService } from './ws-configuration.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-ws-configuration',
    templateUrl: './ws-configuration.component.html'
})
export class WSConfigurationComponent implements OnInit, OnDestroy {
wSConfigurations: WSConfiguration[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private wSConfigurationService: WSConfigurationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.wSConfigurationService.query().subscribe(
            (res: HttpResponse<WSConfiguration[]>) => {
                this.wSConfigurations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWSConfigurations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WSConfiguration) {
        return item.id;
    }
    registerChangeInWSConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe('wSConfigurationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
