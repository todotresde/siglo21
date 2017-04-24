import { Line } from '../line';
import { MOCustomProduct } from '../m-o-custom-product';
export class MO {
    constructor(
        public id?: number,
        public code?: string,
        public date?: any,
        public status?: number,
        public description?: string,
        public line?: Line,
        public mOCustomProduct?: MOCustomProduct,
    ) {
    }
}
