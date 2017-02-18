import { Shared } from 'app/shared';
import { ManufacturingOrderProduct } from '../manufacturingOrderProduct/manufacturingOrderProduct';

export class ManufacturingOrderCustomProduct {
    id: number = Shared.generateId();
    description : string;
    manufacturingOrderProducts : ManufacturingOrderProduct[] = [];

    constructor(config?: any){
    	this.id = (config && config.id) ? config.id : Shared.generateId();
    	this.description = (config && config.description) ? config.description : "";
    	this.manufacturingOrderProducts = (config && config.manufacturingOrderProducts) ? config.manufacturingOrderProducts : [];
    }

    addManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : ManufacturingOrderCustomProduct{
    	let found : boolean = false;

	    this.manufacturingOrderProducts = this.manufacturingOrderProducts.map(mOP => {
	      if(mOP.id === manufacturingOrderProduct.id){
	        found = true;
	        return manufacturingOrderProduct;
	      }else{
	      	return mOP;
	      }
	    })

	    if(!found){
	      this.manufacturingOrderProducts.push(new ManufacturingOrderProduct(manufacturingOrderProduct));
	    }

	    return this;
    }
}
