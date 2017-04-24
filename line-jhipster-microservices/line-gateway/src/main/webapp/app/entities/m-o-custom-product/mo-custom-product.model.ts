import { MOProduct } from '../m-o-product';
export class MOCustomProduct {
    constructor(
        public id?: number,
        public description?: string,
        public mOProduct?: MOProduct,
    ) {
    }
}
