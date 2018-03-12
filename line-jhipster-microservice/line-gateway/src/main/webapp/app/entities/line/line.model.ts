import { WSConfiguration } from '../w-s-configuration';
export class Line {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public wSConfiguration?: WSConfiguration,
    ) {
    }
}
