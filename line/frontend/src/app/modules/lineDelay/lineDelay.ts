import { Shared } from '../../shared/shared';
import { LineDelayType } from '../lineDelayType/lineDelayType';

export class LineDelay {
    id: number = Shared.generateId();
    code: string;
    description: string;
    lineDelayType: LineDelayType = new LineDelayType();
}
