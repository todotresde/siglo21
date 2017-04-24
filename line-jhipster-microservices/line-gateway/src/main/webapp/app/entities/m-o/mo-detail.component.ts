import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MO } from './mo.model';
import { MOService } from './mo.service';

@Component({
    selector: 'jhi-mo-detail',
    templateUrl: './mo-detail.component.html'
})
export class MODetailComponent implements OnInit, OnDestroy {

    mO: MO;
    private subscription: any;

    constructor(
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
    }

}
