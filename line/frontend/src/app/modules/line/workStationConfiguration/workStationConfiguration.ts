import { Commons } from 'app/shared';
import { WorkStation } from 'app/modules/workStation';
import { ProductType } from 'app/modules/productType';
import { User } from 'app/modules/user';
import { Delay } from 'app/modules/delay';

export class WorkStationConfiguration {
    id: number = Commons.generateId();
    workStation: WorkStation = new WorkStation();
    nextWorkStation? : WorkStation = null;
    prevWorkStation? : WorkStation = null;
    productTypes : ProductType[] = [];
    users : User[] = [];
    first : boolean = false;
    last : boolean = false;
    delays : Delay[] = [];

    constructor(options?: any){
        if(options){
            this.id = (options.id) ? options.id : Commons.generateId();
            this.workStation = (options.workStation) ? options.workStation : new WorkStation();
            this.nextWorkStation = (options.nextWorkStation) ? options.nextWorkStation : new WorkStation();
            this.prevWorkStation = (options.prevWorkStation) ? options.prevWorkStation : new WorkStation();
            this.productTypes = (options.productTypes) ? options.productTypes : [];
            this.users = (options.users) ? options.users : [];
            this.first = (options.first) ? options.first : false;
            this.last = (options.last) ? options.last : false; 
            this.delays = (options.delays) ? options.delays : [];
        }
    }
}