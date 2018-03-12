import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MOProduct } from './mo-product.model';
import { MOProductService } from './mo-product.service';

@Component({
    selector: 'jhi-mo-product-detail',
    templateUrl: './mo-product-detail.component.html'
})
export class MOProductDetailComponent implements OnInit, OnDestroy {

    mOProduct: MOProduct;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mOProductService: MOProductService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMOProducts();
    }

    load(id) {
        this.mOProductService.find(id)
            .subscribe((mOProductResponse: HttpResponse<MOProduct>) => {
                this.mOProduct = mOProductResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMOProducts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mOProductListModification',
            (response) => this.load(this.mOProduct.id)
        );
    }
}
