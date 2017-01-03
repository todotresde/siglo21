import { WorkStation } from '../../../workStation/workStation';
import { ProductType } from '../../../productType/productType';
import { User } from '../../../user/user';

export class WorkStationProductTypes {
    id: number;
    workStation: WorkStation;
    nextWorkStation : WorkStation;
    prevWorkStation : WorkStation;
    productTypes : ProductType[];
    users : User[];
}