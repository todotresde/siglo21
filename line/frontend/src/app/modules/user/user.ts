import { Commons } from 'app/shared';

import { Role } from 'app/modules/role';

export class User {
    id: number = Commons.generateId();
    username: string;
    name: string = "";
    password: string;
    email: string;
    roles: Role[] = [];

    constructor(options?: any){
    	if(options){
	        this.id = (options.id) ? options.id : Commons.generateId();
	        this.username = (options.username) ? options.username : "";
	        this.password = (options.password) ? options.password : "";
	        this.email = (options.email) ? options.email : "";
	        this.roles = (options.roles) ? options.roles : [];
    	}
    }
}
