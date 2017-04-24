import { ProductType } from '../product-type';
export class Product {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public productType?: ProductType,
    ) {
    }
}
