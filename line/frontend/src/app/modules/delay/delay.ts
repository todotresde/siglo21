import { Shared } from '../../shared/shared';
import { DelayType } from '../delayType/delayType';

export class Delay {
    id: number = Shared.generateId();
    code: string;
    description: string;
    startTime: Date = new Date();
    endTime: Date;
    delayType: DelayType = new DelayType();
}
