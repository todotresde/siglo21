import { Commons } from 'app/shared';
import { ProductType } from 'app/modules/productType';

export class Product {
    id: number = Commons.generateId();
    code: string;
    description: string;
    productType: ProductType = new ProductType();
}
