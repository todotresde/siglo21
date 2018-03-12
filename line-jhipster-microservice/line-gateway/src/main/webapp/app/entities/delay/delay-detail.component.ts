import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Delay } from './delay.model';
import { DelayService } from './delay.service';

@Component({
    selector: 'jhi-delay-detail',
    templateUrl: './delay-detail.component.html'
})
export class DelayDetailComponent implements OnInit, OnDestroy {

    delay: Delay;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private delayService: DelayService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['delay']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInDelays();
    }

    load (id) {
        this.delayService.find(id).subscribe(delay => {
            this.delay = delay;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDelays() {
        this.eventSubscriber = this.eventManager.subscribe('delayListModification', response => this.load(this.delay.id));
    }

}
