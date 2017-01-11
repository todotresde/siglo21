import { Shared } from '../../shared/shared';
import { WorkStationConfiguration } from './workStationConfiguration/workStationConfiguration';

export class Line {
    id: number = Shared.generateId();
    name : string;
    workStationConfigurations : WorkStationConfiguration[] = [];
}
