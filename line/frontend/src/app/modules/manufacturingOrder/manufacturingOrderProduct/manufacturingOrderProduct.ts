import { Shared } from '../../../shared/shared';
import { Product } from '../../product/product';

export class ManufacturingOrderProduct {
    id: number = Shared.generateId();;
    width : number;
    height : number;
    quantity : number;
    product : Product = new Product();
}
