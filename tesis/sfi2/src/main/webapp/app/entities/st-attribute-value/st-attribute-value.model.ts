import { BaseEntity } from './../../shared';

export class STAttributeValue implements BaseEntity {
    constructor(
        public id?: number,
        public value?: string,
        public product?: BaseEntity,
        public supply?: BaseEntity,
        public supplyType?: BaseEntity,
        public stAttribute?: BaseEntity,
    ) {
    }
}
