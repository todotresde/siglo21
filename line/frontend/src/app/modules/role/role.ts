import { Commons } from 'app/shared';

import { Route } from 'app/modules/route';

export class Role {
    id: number = Commons.generateId();
    name: string = "";
    description: string = "";
    routes: Route[] = [];

    constructor(options?: any){
    	if(options){
	        this.id = (options.id) ? options.id : Commons.generateId();
	        this.name = (options.name) ? options.name : "";
	        this.description = (options.description) ? options.description : "";
	        this.routes = (options.routes) ? options.routes : [];
    	}
    }

}
