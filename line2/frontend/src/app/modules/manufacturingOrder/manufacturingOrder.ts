import { ManufacturingOrderCustomProduct } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct';

export class ManufacturingOrder {
    id: number;
    code : string;
    date : Date;
    customProducts : ManufacturingOrderCustomProduct[];
}
