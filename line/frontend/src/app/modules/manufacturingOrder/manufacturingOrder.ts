import { Commons } from 'app/shared';
import { Line } from 'app/modules/line';
import { ManufacturingOrderCustomProduct } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct';

export class ManufacturingOrder {
    id: number = Commons.generateId();
    code : string;
    date : Date = new Date();
    status : Number = 0;
    line : Line; 
    manufacturingOrderCustomProducts : ManufacturingOrderCustomProduct[] = [];

    constructor(options?: any){
    	this.id = (options && options.id) ? options.id : Commons.generateId();
    	this.code = (options && options.code) ? options.code : "";
    	this.date = (options && options.date) ? options.date : new Date();
        this.line = (options && options.line) ? options.line : null;
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
