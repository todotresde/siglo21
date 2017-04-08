import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Delay } from './delay.model';
import { DelayService } from './delay.service';

@Component({
    selector: 'jhi-delay-detail',
    templateUrl: './delay-detail.component.html'
})
export class DelayDetailComponent implements OnInit, OnDestroy {

    delay: Delay;
    private subscription: any;

    constructor(
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
    }

}
