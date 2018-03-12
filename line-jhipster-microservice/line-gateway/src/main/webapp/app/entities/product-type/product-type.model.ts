export class ProductType {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public hasWidth?: boolean,
        public hasHeight?: boolean,
    ) {
        this.hasWidth = false;
        this.hasHeight = false;
    }
}
