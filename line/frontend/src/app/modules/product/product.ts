import { Shared } from '../../shared/shared';
import { ProductType } from '../productType/productType';

export class Product {
    id: number = Shared.generateId();
    code: string;
    description: string;
    productType: ProductType = new ProductType();
}
