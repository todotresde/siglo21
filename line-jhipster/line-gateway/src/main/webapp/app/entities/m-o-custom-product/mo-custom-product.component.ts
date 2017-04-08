import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { MOCustomProduct } from './mo-custom-product.model';
import { MOCustomProductService } from './mo-custom-product.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-mo-custom-product',
    templateUrl: './mo-custom-product.component.html'
})
export class MOCustomProductComponent implements OnInit, OnDestroy {
mOCustomProducts: MOCustomProduct[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private mOCustomProductService: MOCustomProductService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['mOCustomProduct']);
    }

    loadAll() {
        this.mOCustomProductService.query().subscribe(
            (res: Response) => {
                this.mOCustomProducts = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMOCustomProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: MOCustomProduct) {
        return item.id;
    }



    registerChangeInMOCustomProducts() {
        this.eventSubscriber = this.eventManager.subscribe('mOCustomProductListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
