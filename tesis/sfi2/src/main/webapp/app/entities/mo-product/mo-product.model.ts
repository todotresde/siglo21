import { BaseEntity } from './../../shared';

export class MOProduct implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public manufacturingOrder?: BaseEntity,
        public product?: BaseEntity,
    ) {
    }
}
