import { Shared } from '../../shared/shared';
import { ManufacturingOrder } from '../manufacturingOrder/manufacturingOrder';
import { Line } from '../line/line';
import { WorkStation } from '../workStation/workStation';
import { ManufacturingOrderProduct } from '../manufacturingOrder/manufacturingOrderProduct/manufacturingOrderProduct';
import { User } from '../user/user';

export class Trace {
    id: number = Shared.generateId();
    manufacturingOrder : ManufacturingOrder = new ManufacturingOrder();
    line : Line = new Line();
    workStation : WorkStation = new WorkStation();
    manufacturingOrderProduct: ManufacturingOrderProduct = new ManufacturingOrderProduct();
    startTime: Date;
    endTime : Date;
    time: number;
    state: number;
    user: User = new User();
}
