import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Delay } from '../delay';
import { DelayService } from '../delay.service';

@Component({
  selector: 'app-delay-list',
  templateUrl: './delay-list.component.html',
  providers:[DelayService]
})
export class DelayListComponent implements OnInit, OnChanges {
  @Input() inputDelay: Delay[];
  @Input() inputDelays: Delay[];
  @Output() outputDelay = new EventEmitter<Delay>();
  
  delays: Delay[];

  constructor(private router: Router, private delayService: DelayService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
  }
  
  ngOnChanges(changes:  {[propKey: string]: SimpleChange}) {

    for (let propName in changes) {
      switch(propName){
        case "inputDelays": this.delays = changes["inputDelays"].currentValue; break;
        case "inputDelay": this.ngOnInit(); break;
      }
    }
  }

  edit(delay: Delay): void {
    //this.router.navigate(['../delay', delay.id],{ relativeTo: this.r });
    this.outputDelay.emit(delay);
  }

  remove(delay: Delay): void {
    this.delayService
      .remove(delay)
      .then(delay => this.delays = this.delays.filter(u => u.id !== delay.id))
      .catch(error => {});
  }

}
