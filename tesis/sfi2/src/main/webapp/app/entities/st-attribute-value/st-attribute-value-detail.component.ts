import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { STAttributeValue } from './st-attribute-value.model';
import { STAttributeValueService } from './st-attribute-value.service';

@Component({
    selector: 'jhi-st-attribute-value-detail',
    templateUrl: './st-attribute-value-detail.component.html'
})
export class STAttributeValueDetailComponent implements OnInit, OnDestroy {

    sTAttributeValue: STAttributeValue;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sTAttributeValueService: STAttributeValueService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSTAttributeValues();
    }

    load(id) {
        this.sTAttributeValueService.find(id)
            .subscribe((sTAttributeValueResponse: HttpResponse<STAttributeValue>) => {
                this.sTAttributeValue = sTAttributeValueResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSTAttributeValues() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sTAttributeValueListModification',
            (response) => this.load(this.sTAttributeValue.id)
        );
    }
}
