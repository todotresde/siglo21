import { Shared } from '../../shared/shared';
import { ManufacturingOrderCustomProduct } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct';

export class ManufacturingOrder {
    id: number = Shared.generateId();
    code : string;
    date : Date = new Date();
    manufacturingOrderCustomProducts : ManufacturingOrderCustomProduct[] = [];

    constructor(options?: any){
    	this.id = (options && options.id) ? options.id : Shared.generateId();
    	this.code = (options && options.code) ? options.code : "";
    	this.date = (options && options.date) ? options.date : new Date();
    	this.manufacturingOrderCustomProducts = (options && options.manufacturingOrderCustomProducts) ? options.manufacturingOrderCustomProducts : [];
    }

    addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct) : ManufacturingOrder{
    	let found : boolean = false;

	    this.manufacturingOrderCustomProducts = this.manufacturingOrderCustomProducts.map(mOCP => {
	      if(mOCP.id === manufacturingOrderCustomProduct.id){
	        found = true;
	        return manufacturingOrderCustomProduct;
	      }else{
	      	return mOCP;
	      }
	    });

	    if(!found){
	      this.manufacturingOrderCustomProducts.push(manufacturingOrderCustomProduct);
	    }

	    return this;
    }

    getManufacturingOrderCustomProduct(id: number) : ManufacturingOrderCustomProduct{
    	let manufacturingOrderCustomProduct : ManufacturingOrderCustomProduct = null;

    	this.manufacturingOrderCustomProducts.forEach(mOCP => {
	      if(mOCP.id == id){
	        manufacturingOrderCustomProduct = new ManufacturingOrderCustomProduct(mOCP);
	      }
	    });

	    return manufacturingOrderCustomProduct;
    }
}
