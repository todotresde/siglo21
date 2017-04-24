import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Tracing } from './tracing.model';
import { TracingService } from './tracing.service';

@Component({
    selector: 'jhi-tracing-detail',
    templateUrl: './tracing-detail.component.html'
})
export class TracingDetailComponent implements OnInit, OnDestroy {

    tracing: Tracing;
    private subscription: any;

    constructor(
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
    }

}
