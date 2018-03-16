import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public supplies?: BaseEntity[],
        public productType?: BaseEntity,
        public moProduct?: BaseEntity,
    ) {
    }
}
