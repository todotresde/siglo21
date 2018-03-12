import { BaseEntity } from './../../shared';

export class STAttribute implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public supplyTypes?: BaseEntity[],
    ) {
    }
}
