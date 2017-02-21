import { Commons } from 'app/shared';

export class WorkStation {
    id: number = Commons.generateId();
    name: string = "";
    shortName: string = "";
    ip: string;

    constructor(options?: any){
    	if(options){
	        this.id = (options.id) ? options.id : Commons.generateId();
	        this.name = (options.name) ? options.name : "";
	        this.shortName = (options.shortName) ? options.shortName : "";
	        this.ip = (options.ip) ? options.ip : "";
    	}
    }
}
