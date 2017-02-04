import { Component, OnInit } from '@angular/core';

import { Line } from '../line/line';
import { LineService } from '../line/line.service';
import { Delay } from '../delay/delay';
import { WorkStationConfiguration } from '../line/workStationConfiguration/workStationConfiguration';
import { DelayService } from '../delay/delay.service';

import { Message } from '../../shared/message/message';

@Component({
    selector: 'app-module-lineDelay',
    templateUrl: './lineDelay.component.html',
    providers: [LineService, DelayService]
})
export class LineDelayComponent {
    message: Message = new Message();
    lines: Line[] = [];
    selectedLine: Line = new Line();
    time : any;
    workStationConfigurations : WorkStationConfiguration[] = [];

    constructor(private lineService: LineService, private delayService: DelayService){

    }

    ngOnInit(): void {
    	let today = new Date();
    	today.setHours(0);
    	today.setMinutes(0);
    	today.setSeconds(0);

    	let tomorrow = new Date(today.getTime());
    	tomorrow.setDate(today.getDate() + 1);

    	this.time = Delay.newDelayTime(today, today, tomorrow, tomorrow);

    	this.lineService
            .getAll().then(lines => this.lines = lines)
            .catch(error => {
                this.message.error(JSON.parse(error._body).message);
            })
    }

    search(line: Line, time: any): void{
    	this.delayService
            .search(line, Delay.convertStartDateTimeToDate(time), Delay.convertEndDateTimeToDate(time))
            .then(workStationConfigurations => this.workStationConfigurations = workStationConfigurations)
            .catch(error => {});
    }

}
