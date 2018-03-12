import { DelayType } from '../delay-type';
export class Delay {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public time?: number,
        public description?: string,
        public delayType?: DelayType,
    ) {
    }
}
