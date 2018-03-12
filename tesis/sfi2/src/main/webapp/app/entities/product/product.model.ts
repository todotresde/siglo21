import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public moProducts?: BaseEntity[],
        public supplies?: BaseEntity[],
        public productType?: BaseEntity,
    ) {
    }
}
