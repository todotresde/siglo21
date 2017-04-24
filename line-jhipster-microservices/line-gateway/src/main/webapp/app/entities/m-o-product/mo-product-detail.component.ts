import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MOProduct } from './mo-product.model';
import { MOProductService } from './mo-product.service';

@Component({
    selector: 'jhi-mo-product-detail',
    templateUrl: './mo-product-detail.component.html'
})
export class MOProductDetailComponent implements OnInit, OnDestroy {

    mOProduct: MOProduct;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private mOProductService: MOProductService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['mOProduct']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.mOProductService.find(id).subscribe(mOProduct => {
            this.mOProduct = mOProduct;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
