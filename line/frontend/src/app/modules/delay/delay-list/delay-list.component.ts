import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Delay } from '../delay';
import { DelayService } from '../delay.service';

@Component({
  selector: 'app-delay-list',
  templateUrl: './delay-list.component.html',
  providers:[DelayService]
})
export class DelayListComponent implements OnInit {
  delays: Delay[];

  constructor(private router: Router, private delayService: DelayService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.delayService
      .getAll()
      .then(delays => this.delays = delays)
      .catch(error => {});
  }

  create(): void {
    this.router.navigate(['../delay'],{ relativeTo: this.r });
  }

  edit(delay: Delay): void {
    this.router.navigate(['../delay', delay.id],{ relativeTo: this.r });
  }

  remove(delay: Delay): void {
    this.delayService
      .remove(delay)
      .then(delay => this.delays = this.delays.filter(u => u.id !== delay.id))
      .catch(error => {});
  }

}
