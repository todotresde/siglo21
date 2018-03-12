import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { MO } from './mo.model';
import { MOService } from './mo.service';

@Component({
    selector: 'jhi-mo-detail',
    templateUrl: './mo-detail.component.html'
})
export class MODetailComponent implements OnInit, OnDestroy {

    mO: MO;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private mOService: MOService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['mO']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInMOS();
    }

    load (id) {
        this.mOService.find(id).subscribe(mO => {
            this.mO = mO;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMOS() {
        this.eventSubscriber = this.eventManager.subscribe('mOListModification', response => this.load(this.mO.id));
    }

}
