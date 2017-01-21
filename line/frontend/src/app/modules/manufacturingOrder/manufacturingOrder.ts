import { Shared } from '../../shared/shared';
import { ManufacturingOrderCustomProduct } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct';

export class ManufacturingOrder {
    id: number = Shared.generateId();
    code : string;
    date : Date = new Date();
    manufacturingOrderCustomProducts : ManufacturingOrderCustomProduct[] = [];

    addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct) : ManufacturingOrder{
    	let found : boolean = false;

	    this.manufacturingOrderCustomProducts = this.manufacturingOrderCustomProducts.map(mOCP => {
	      if(mOCP.id === manufacturingOrderCustomProduct.id){
	        found = true;
	        return manufacturingOrderCustomProduct;
	      }else{
	      	return mOCP;
	      }
	    })

	    if(!found){
	      this.manufacturingOrderCustomProducts.push(manufacturingOrderCustomProduct);
	    }

	    return this;
    }
}
