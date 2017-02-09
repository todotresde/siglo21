import { DatePipe } from '@angular/common';

export class Commons {
    private static datePipe: DatePipe = new DatePipe("es");

    constructor() {}

    public static delay(time: number = 2) {
        return new Promise((resolve) => setTimeout(resolve, time * 1000))
    }

    public static sort(array: Array < any > , args: string): Array < any > {
        if(array){
	        array.sort((a: any, b: any) => {
	            if (a[args] < b[args]) {
	                return -1;
	            } else if (a[args] > b[args]) {
	                return 1;
	            } else {
	                return 0;
	            }
	        });
	    }
	    return array;
    }

    public static convertDateToDateString(date: Date): string{
    	return this.datePipe.transform(date ? date : new Date(), 'yyyy-MM-dd');
    }

    public static convertDateToTimeString(date: Date): string{
    	return this.datePipe.transform(date ? date : new Date(), 'hh:mm');
    }

    /*
	dateString as "YYYY-MM-DD"
	timeString as "HH:MM"
    */
    public static convertDateTimeStringToDate(dateString: String, timeString: String): Date {
	    let patternDate = /(\d{4})\-(\d{2})\-(\d{2})/;
	    let patternTime = /(\d{2})\:(\d{2})/;

	    return new Date(dateString.replace(patternDate, '$1-$2-$3') + " " + timeString.replace(patternDate, '$1:$2'));
	}

	/*
	dateString as "YYYY-MM-DD"
    */
    public static convertDateStringToDate(dateString: String): Date {
	    let patternDate = /(\d{4})\-(\d{2})\-(\d{2})/;
	    
	    return new Date(dateString.replace(patternDate, '$1-$2-$3') + " 00:00");
	}
}
