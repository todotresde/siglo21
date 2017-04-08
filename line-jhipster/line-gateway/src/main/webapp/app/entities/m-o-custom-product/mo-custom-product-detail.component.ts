import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MOCustomProduct } from './mo-custom-product.model';
import { MOCustomProductService } from './mo-custom-product.service';

@Component({
    selector: 'jhi-mo-custom-product-detail',
    templateUrl: './mo-custom-product-detail.component.html'
})
export class MOCustomProductDetailComponent implements OnInit, OnDestroy {

    mOCustomProduct: MOCustomProduct;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private mOCustomProductService: MOCustomProductService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['mOCustomProduct']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.mOCustomProductService.find(id).subscribe(mOCustomProduct => {
            this.mOCustomProduct = mOCustomProduct;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
