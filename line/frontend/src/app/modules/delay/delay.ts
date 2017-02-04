import { Shared } from '../../shared/shared';
import { DelayType } from '../delayType/delayType';

export class Delay {
    id: number = Shared.generateId();
    description: string;
    startTime: Date;
    endTime: Date;
    delayType: DelayType = new DelayType();
    time: number;
}
