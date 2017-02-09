import { Shared } from '../../../shared/shared';
import { WorkStation } from '../../workStation/workStation';
import { ProductType } from '../../productType/productType';
import { User } from '../../user/user';
import { Delay } from '../../delay/delay';

export class WorkStationConfiguration {
    id: number = Shared.generateId();
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
            this.id = (options.id) ? options.id : Shared.generateId();
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