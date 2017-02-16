import { Line, WorkStationConfiguration } from 'app/modules/line';
import { Trace } from 'app/modules/trace';
import { DelayType } from 'app/modules/delayType';

import { Commons } from 'app/shared';

import { DatePipe } from '@angular/common';

export class Delay {
    id: number = Commons.generateId();
    description: string;
    startTime: Date;
    endTime: Date;
    delayType: DelayType = new DelayType();
    time: number;

    constructor(options?: any){
        if(options){
            this.id = (options.id) ? options.id : Commons.generateId();
            this.description = (options.description) ? options.description : "";
            this.startTime = (options.startTime) ? options.startTime : new Date();
            this.endTime = (options.endTime) ? options.endTime : new Date();
            this.delayType = (options.delayType) ? options.delayType : new DelayType();
            this.time = (options.time) ? options.time : 0;
        }
    }

    static newDelayTime(startDate?: Date, startTime?: Date, endDate?: Date, endTime?: Date): any {
        return {
            startDate: Commons.convertDateToDateString(startDate),
            startTime: Commons.convertDateToTimeString(startTime),
            endDate: Commons.convertDateToDateString(endDate),
            endTime: Commons.convertDateToTimeString(endTime)
        }
    }

    static convertStartDateTimeToDate(time: any): Date {
    	return Commons.convertDateTimeStringToDate(time.startDate, time.startTime);
    }

    static convertEndDateTimeToDate(time: any): Date {
    	return Commons.convertDateTimeStringToDate(time.endDate, time.endTime);
    }

    
}
