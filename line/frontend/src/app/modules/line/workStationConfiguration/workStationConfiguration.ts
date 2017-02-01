import { Shared } from '../../../shared/shared';
import { WorkStation } from '../../workStation/workStation';
import { ProductType } from '../../productType/productType';
import { User } from '../../user/user';

export class WorkStationConfiguration {
    id: number = Shared.generateId();
    workStation: WorkStation = new WorkStation();
    nextWorkStation? : WorkStation = null;
    prevWorkStation? : WorkStation = null;
    productTypes : ProductType[] = [];
    users : User[] = [];
    first : boolean = false;
    last : boolean = false;

    constructor(){

    }
}