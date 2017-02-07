import { Shared } from '../../shared/shared';

import { Role } from '../role/role';

export class User {
    id: number = Shared.generateId();
    username: string;
    name: string = "";
    password: string;
    email: string;
    roles: Role[] = [];

    constructor(options?: any){
    	if(options){
	        this.id = (options.id) ? options.id : Shared.generateId();
	        this.username = (options.username) ? options.username : "";
	        this.password = (options.password) ? options.password : "";
	        this.email = (options.email) ? options.email : "";
	        this.roles = (options.roles) ? options.roles : [];
    	}
    }
}
