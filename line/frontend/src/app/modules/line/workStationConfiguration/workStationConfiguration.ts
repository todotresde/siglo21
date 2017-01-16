import { Shared } from '../../../shared/shared';
import { WorkStation } from '../../workStation/workStation';
import { ProductType } from '../../productType/productType';
import { User } from '../../user/user';

export class WorkStationConfiguration {
    id: number = Shared.generateId();
    workStation: WorkStation = new WorkStation();
    nextWorkStation : WorkStation = new WorkStation();
    prevWorkStation : WorkStation = new WorkStation();
    productTypes : ProductType[] = [];
    users : User[] = [];

    constructor(){

    }
}