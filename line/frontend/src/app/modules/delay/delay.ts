import { Shared } from '../../shared/shared';
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
        let datePipe = new DatePipe("es");

        return {
            startDate: datePipe.transform(startDate ? startDate : new Date(), 'yyyy-MM-dd'),
            startTime: datePipe.transform(startTime ? startTime : new Date(), 'hh:mm'),
            endDate: datePipe.transform(endDate ? endDate : new Date(), 'yyyy-MM-dd'),
            endTime: datePipe.transform(endTime ? endTime : new Date(), 'hh:mm')
        }
    }

    static convertStartDateTimeToDate(time: any): Date {
    	return this.convertDateTimeToDate(time.startDate, time.startTime);
    }

    static convertEndDateTimeToDate(time: any): Date {
    	return this.convertDateTimeToDate(time.endDate, time.endTime);
    }

    private static convertDateTimeToDate(dateString: String, timeString: String): Date {
	    let patternDate = /(\d{4})\-(\d{2})\-(\d{2})/;
	    let patternTime = /(\d{2})\:(\d{2})/;

	    return new Date(dateString.replace(patternDate, '$1-$2-$3') + " " + timeString.replace(patternDate, '$1:$2'));
	  }
}
