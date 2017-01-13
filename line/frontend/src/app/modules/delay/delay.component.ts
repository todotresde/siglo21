import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Delay } from './delay';
import { DelayService } from './delay.service';

@Component({
  selector: 'app-module-delay',
  templateUrl: './delay.component.html',
  providers: [DelayService]
})
export class DelayComponent {
	selectedDelay: Delay = new Delay();
	delays: Delay[] = [];

	constructor(private router: Router, private delayService: DelayService, private r:ActivatedRoute) {

    }

    ngOnInit(): void{
	    this.delayService
	      .getAll()
	      .then(delays => this.delays = delays)
	      .catch(error => {});
	  }

	create(): void {
		this.selectedDelay = new Delay();
	}

	setSelectedDelay(delay: Delay): void{
		this.selectedDelay = delay;
	}

	updateDelays(delay: Delay): void{
		this.ngOnInit();
	}
}
