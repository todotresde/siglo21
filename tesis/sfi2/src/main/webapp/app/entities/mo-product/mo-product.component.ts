import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MOProduct } from './mo-product.model';
import { MOProductService } from './mo-product.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-mo-product',
    templateUrl: './mo-product.component.html'
})
export class MOProductComponent implements OnInit, OnDestroy {
mOProducts: MOProduct[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mOProductService: MOProductService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mOProductService.query().subscribe(
            (res: HttpResponse<MOProduct[]>) => {
                this.mOProducts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMOProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MOProduct) {
        return item.id;
    }
    registerChangeInMOProducts() {
        this.eventSubscriber = this.eventManager.subscribe('mOProductListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
