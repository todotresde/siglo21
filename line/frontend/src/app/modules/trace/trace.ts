import { Commons } from 'app/shared';
import { ManufacturingOrder } from 'app/modules/manufacturingOrder/manufacturingOrder';
import { ManufacturingOrderCustomProduct } from 'app/modules/manufacturingOrder/manufacturingOrderCustomProduct/manufacturingOrderCustomProduct';
import { ManufacturingOrderProduct } from 'app/modules/manufacturingOrder/manufacturingOrderProduct/manufacturingOrderProduct';
import { Line } from 'app/modules/line';
import { WorkStation } from 'app/modules//workStation';
import { User } from 'app/modules/user';
import { Delay } from 'app/modules/delay';

export class Trace {
    id: number = Commons.generateId();
    code: String;
    manufacturingOrder : ManufacturingOrder = new ManufacturingOrder();
    line : Line = new Line();
    workStation : WorkStation = new WorkStation();
    manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct();
    manufacturingOrderProduct: ManufacturingOrderProduct = new ManufacturingOrderProduct();
    inTime: Date;
    startTime: Date;
    endTime : Date;
    time: number;
    status: number;
    user: User = new User();
    delays : Delay[] = [];

    constructor(options?: any){
        if(options){
            let inTime = new Date(); (options.inTime) ? inTime.setTime(options.inTime) : new Date();
            let startTime = new Date(); (options.startTime) ? startTime.setTime(options.startTime) : new Date();
            let endTime = new Date(); (options.endDate) ? endTime.setTime(options.endDate) : new Date();

            this.id = (options.id) ? options.id : Commons.generateId();
            this.code = (options.code) ? options.code : "";
            this.manufacturingOrder = (options.manufacturingOrder) ? new ManufacturingOrder(options.manufacturingOrder) : null;
            this.line = (options.line) ? new Line(options.line) : null;
            this.workStation = (options.workStation) ? new WorkStation(options.workStation) : null;
            this.manufacturingOrderCustomProduct = (options.manufacturingOrderCustomProduct) ? new ManufacturingOrderCustomProduct(options.manufacturingOrderCustomProduct) : null;
            this.manufacturingOrderProduct = (options.manufacturingOrderProduct) ? new ManufacturingOrderProduct(options.manufacturingOrderProduct) : null;
            this.inTime = inTime;
            this.startTime = startTime;
            this.endTime = endTime;
            this.time = (options.time) ? options.time : 0;
            this.status = (options.status) ? options.status : 0;
            this.user = (options.user) ? new User(options.user) : null;
            this.delays = (options.delays) ? options.delays : [];    
        }
        
    }
}
