import { BaseEntity } from './../../shared';

export class SupplyType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public supplies?: BaseEntity[],
        public stAttributes?: BaseEntity[],
        public wsConfigurations?: BaseEntity[],
    ) {
    }
}
