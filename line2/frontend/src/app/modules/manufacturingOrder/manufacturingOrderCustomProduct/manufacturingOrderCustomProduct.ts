import { ManufacturingOrderProduct } from '../manufacturingOrderProduct/manufacturingOrderProduct';

export class ManufacturingOrderCustomProduct {
    id: number;
    description : string;
    date : Date;
    manufacturingOrderProducts : ManufacturingOrderProduct[];
}
