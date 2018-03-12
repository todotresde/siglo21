import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Line } from './line.model';
import { LineService } from './line.service';

@Component({
    selector: 'jhi-line-detail',
    templateUrl: './line-detail.component.html'
})
export class LineDetailComponent implements OnInit, OnDestroy {

    line: Line;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private lineService: LineService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['line']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInLines();
    }

    load (id) {
        this.lineService.find(id).subscribe(line => {
            this.line = line;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLines() {
        this.eventSubscriber = this.eventManager.subscribe('lineListModification', response => this.load(this.line.id));
    }

}
