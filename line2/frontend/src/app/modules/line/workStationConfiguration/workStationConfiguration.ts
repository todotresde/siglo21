import { WorkStation } from '../../workStation/workStation';
import { ProductType } from '../../productType/productType';
import { User } from '../../user/user';

export class WorkStationConfiguration {
    id: number = Math.floor(Math.random() * 10000000);
    workStation: WorkStation;
    nextWorkStation : WorkStation;
    prevWorkStation : WorkStation;
    productTypes : ProductType[] = [];
    users : User[] = [];

    constructor(){

    }
}