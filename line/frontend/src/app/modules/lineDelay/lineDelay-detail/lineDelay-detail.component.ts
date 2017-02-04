import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Delay } from '../../delay/delay';
import { DelayService } from '../../delay/delay.service';

@Component({
    selector: 'app-line-delay-detail',
    templateUrl: './lineDelay-detail.component.html',
    providers: [DelayService]
})
export class LineDelayDetailComponent implements OnInit {

    delay: Delay;

    constructor(private route: ActivatedRoute, private lineDelayService: DelayService) {
        this.delay = new Delay();
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params["id"]) {
                this.lineDelayService.get(params["id"]).then(delay => {
                    this.delay = delay;
                });
            }
        });

    }

        save(): void {
        this.lineDelayService
            .save(this.delay)
            .then(delay => {
                this.delay = delay;
            }).catch(error => {})
    }

}
