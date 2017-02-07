import { Shared } from '../../shared/shared';
import { Commons } from '../../shared/commons';
import { DelayType } from '../delayType/delayType';
import { DatePipe } from '@angular/common';

export class Delay {
    id: number = Shared.generateId();
    description: string;
    startTime: Date;
    endTime: Date;
    delayType: DelayType = new DelayType();
    time: number;

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
