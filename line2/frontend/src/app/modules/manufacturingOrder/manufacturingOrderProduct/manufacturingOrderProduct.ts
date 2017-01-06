import { Product } from '../../product/product';

export class ManufacturingOrderProduct {
    id: number;
    width : number;
    height : number;
    quantity : number;
    product : Product = new Product();
}
