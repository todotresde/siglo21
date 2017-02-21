import { Commons } from 'app/shared';

export class Column {
    name: string;
    field: string;
    width: number;

    constructor(options?: any){
    	if(options){
    		this.name = (options.name) ? options.name : "";
    		this.field = (options.field) ? options.field : this.name;
    		this.width = (options.width) ? options.width : 2;
    	}
    }

}
