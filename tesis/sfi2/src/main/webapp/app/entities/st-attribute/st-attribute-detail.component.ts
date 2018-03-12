import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { STAttribute } from './st-attribute.model';
import { STAttributeService } from './st-attribute.service';

@Component({
    selector: 'jhi-st-attribute-detail',
    templateUrl: './st-attribute-detail.component.html'
})
export class STAttributeDetailComponent implements OnInit, OnDestroy {

    sTAttribute: STAttribute;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sTAttributeService: STAttributeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSTAttributes();
    }

    load(id) {
        this.sTAttributeService.find(id)
            .subscribe((sTAttributeResponse: HttpResponse<STAttribute>) => {
                this.sTAttribute = sTAttributeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSTAttributes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sTAttributeListModification',
            (response) => this.load(this.sTAttribute.id)
        );
    }
}
