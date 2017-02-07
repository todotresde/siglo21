import { Shared } from '../../shared/shared';
import { ManufacturingOrder } from '../manufacturingOrder/manufacturingOrder';
import { Line } from '../line/line';
import { WorkStation } from '../workStation/workStation';
import { ManufacturingOrderProduct } from '../manufacturingOrder/manufacturingOrderProduct/manufacturingOrderProduct';
import { User } from '../user/user';
import { Delay } from '../delay/delay';

export class Trace {
    id: number = Shared.generateId();
    code: String;
    manufacturingOrder : ManufacturingOrder = new ManufacturingOrder();
    line : Line = new Line();
    workStation : WorkStation = new WorkStation();
    manufacturingOrderProduct: ManufacturingOrderProduct = new ManufacturingOrderProduct();
    startTime: Date;
    endTime : Date;
    time: number;
    status: number;
    user: User = new User();
    delays : Delay[] = [];

    constructor(options?: any){
        if(options){
            let startTime = new Date(); (options.startTime) ? startTime.setTime(options.startTime) : new Date();
            let endTime = new Date(); (options.endDate) ? endTime.setTime(options.endDate) : new Date();

            this.id = (options.id) ? options.id : Shared.generateId();
            this.code = (options.code) ? options.code : "";
            this.manufacturingOrder = (options.manufacturingOrder) ? new ManufacturingOrder(options.manufacturingOrder) : null;
            this.line = (options.line) ? new Line(options.line) : null;
            this.workStation = (options.workStation) ? new WorkStation(options.workStation) : null;
            this.manufacturingOrderProduct = (options.manufacturingOrderProduct) ? new ManufacturingOrderProduct(options.manufacturingOrderProduct) : null;
            this.startTime = startTime;
            this.endTime = endTime;
            this.time = (options.time) ? options.time : 0;
            this.status = (options.status) ? options.status : 0;
            this.user = (options.user) ? new User(options.user) : null;
            this.delays = (options.delays) ? options.delays : [];    
        }
        
    }
}
