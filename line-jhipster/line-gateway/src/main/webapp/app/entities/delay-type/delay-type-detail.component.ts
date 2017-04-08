import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { DelayType } from './delay-type.model';
import { DelayTypeService } from './delay-type.service';

@Component({
    selector: 'jhi-delay-type-detail',
    templateUrl: './delay-type-detail.component.html'
})
export class DelayTypeDetailComponent implements OnInit, OnDestroy {

    delayType: DelayType;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private delayTypeService: DelayTypeService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['delayType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.delayTypeService.find(id).subscribe(delayType => {
            this.delayType = delayType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
