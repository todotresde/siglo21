import { BaseEntity } from './../../shared';

export class PTAttribute implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public productTypes?: BaseEntity[],
    ) {
    }
}
