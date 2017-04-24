import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { WS } from './ws.model';
import { WSService } from './ws.service';

@Component({
    selector: 'jhi-ws-detail',
    templateUrl: './ws-detail.component.html'
})
export class WSDetailComponent implements OnInit, OnDestroy {

    wS: WS;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private wSService: WSService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['wS']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.wSService.find(id).subscribe(wS => {
            this.wS = wS;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
