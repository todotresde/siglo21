import { Shared } from '../../../shared/shared';
import { Product } from '../../product/product';

export class ManufacturingOrderProduct {
    id: number = Shared.generateId();;
    width : number;
    height : number;
    quantity : number;
    product : Product = new Product();

    constructor(options?: any){
    	this.id = (options && options.id) ? options.id : Shared.generateId();
    	this.width = (options && options.width) ? options.width : undefined;
    	this.height = (options && options.height) ? options.height : undefined;
    	this.quantity = (options && options.quantity) ? options.quantity : undefined;
    	this.product = (options && options.product) ? options.product : new Product();
    }
}
