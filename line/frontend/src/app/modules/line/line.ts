import { Shared } from '../../shared/shared';
import { WorkStation } from '../workStation/workStation';
import { WorkStationConfiguration } from './workStationConfiguration/workStationConfiguration';

export class Line {
    id: number = Shared.generateId();
    name : string;
    workStationConfigurations : WorkStationConfiguration[] = [];

    constructor(options?: any){
    	this.id = (options && options.id) ? options.id : Shared.generateId();
    	this.name = (options && options.code) ? options.code : "";
    	this.workStationConfigurations = (options && options.workStationConfigurations) ? options.workStationConfigurations : [];
    }

    getWorkStations(): WorkStation[]{
    	let workStations: WorkStation[] = [];

    	this.workStationConfigurations.forEach(workStationConfiguration => {

    		if(workStations.filter(workstation => { return workstation.id == workStationConfiguration.workStation.id; }).length == 0){
    			workStations.push(workStationConfiguration.workStation);
    		}
    	});
    	return workStations;
    }
}
