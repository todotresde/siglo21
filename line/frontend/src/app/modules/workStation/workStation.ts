import { Shared } from '../../shared/shared';

export class WorkStation {
    id: number = Shared.generateId();
    name: string = "";
    shortName: string = "";
    ip: string;

    constructor(options?: any){
    	if(options){
	        this.id = (options.id) ? options.id : Shared.generateId();
	        this.name = (options.name) ? options.name : "";
	        this.shortName = (options.shortName) ? options.shortName : "";
	        this.ip = (options.ip) ? options.ip : "";
    	}
    }
}
