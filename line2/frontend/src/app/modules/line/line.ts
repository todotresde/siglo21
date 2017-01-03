import { WorkStationConfiguration } from './workStationConfiguration/workStationConfiguration';

export class Line {
    id: number;
    name : string;
    workStationConfigurations : WorkStationConfiguration[];
}
