import { Shared } from '../../../shared/shared';
import { WorkStation } from '../../workStation/workStation';
import { ProductType } from '../../productType/productType';
import { User } from '../../user/user';

export class WorkStationConfiguration {
    id: number = Shared.generateId();
    workStation: WorkStation;
    nextWorkStation : WorkStation;
    prevWorkStation : WorkStation;
    productTypes : ProductType[] = [];
    users : User[] = [];

    constructor(){

    }
}