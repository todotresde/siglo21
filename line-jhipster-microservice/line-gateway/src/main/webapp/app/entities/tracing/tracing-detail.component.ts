import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Tracing } from './tracing.model';
import { TracingService } from './tracing.service';

@Component({
    selector: 'jhi-tracing-detail',
    templateUrl: './tracing-detail.component.html'
})
export class TracingDetailComponent implements OnInit, OnDestroy {

    tracing: Tracing;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private tracingService: TracingService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['tracing']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInTracings();
    }

    load (id) {
        this.tracingService.find(id).subscribe(tracing => {
            this.tracing = tracing;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTracings() {
        this.eventSubscriber = this.eventManager.subscribe('tracingListModification', response => this.load(this.tracing.id));
    }

}
