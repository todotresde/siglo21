import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

import { Delay } from '../delay';
import { DelayService } from '../delay.service';
import { DelayType } from '../../delayType/delayType';
import { DelayTypeService } from '../../delayType/delayType.service';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';

@Component({
  selector: 'app-delay-detail',
  templateUrl: './delay-detail.component.html',
  providers:[DelayService, DelayTypeService, DatePipe]
})
export class DelayDetailComponent implements OnInit, OnChanges {
  @Input() inputDelay: Delay = new Delay();
  @Output() outputDelay = new EventEmitter<Delay>()

  message: Message = new Message();
  delay : Delay;
  delayTypes: DelayType[];
  selectedDelayType: DelayType = new DelayType(); 
  time : any;

  constructor(private datePipe: DatePipe, private location: Location, private route: ActivatedRoute, private delayService: DelayService, private delayTypeService: DelayTypeService) { 
    this.delay = new Delay();
  }

  ngOnInit() : void{
    this.time = Delay.newDelayTime();

    this.route.params.subscribe(params => {
      if(params["id"]){
        this.delayService.get(params["id"])
          .then(delay =>{ 
            this.delay = delay;
            this.selectedDelayType = this.delay.delayType;
          })
          .catch(error => {
            this.message.error(JSON.parse(error._body).message);
          });
      }
    });

    this.delayTypeService.getAll().then(delayTypes => this.delayTypes = delayTypes);
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputDelay"].currentValue)
      this.delay = changes["inputDelay"].currentValue;
    else
      this.delay = new Delay();
  }

  save(delay: Delay): void {
    this.delay.delayType = this.selectedDelayType;
    this.delay.startTime = Delay.convertStartDateTimeToDate(this.time);
    this.delay.endTime = Delay.convertEndDateTimeToDate(this.time);
    this.delay.time = Math.floor((this.delay.endTime.getTime() - this.delay.startTime.getTime()) / 60000);

    this.delayService
        .save(delay)
        .then(delay => {
          this.message.success("");

          Commons.delay().then(() => {
            this.outputDelay.emit(delay);
          });

        }).catch(error => {
           this.message.error(JSON.parse(error._body).message);
        })
  }

}
