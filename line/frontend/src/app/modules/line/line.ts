import { Commons } from 'app/shared';
import { WorkStation } from 'app/modules/workStation';
import { WorkStationConfiguration } from 'app/modules/line';

export class Line {
    id: number = Commons.generateId();
    name : string;
    workStationConfigurations : WorkStationConfiguration[] = [];

    constructor(options?: any){
    	this.id = (options && options.id) ? options.id : Commons.generateId();
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
