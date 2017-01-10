import { Shared } from '../../../shared/shared';
import { ManufacturingOrderProduct } from '../manufacturingOrderProduct/manufacturingOrderProduct';

export class ManufacturingOrderCustomProduct {
    id: number = Shared.generateId();
    description : string;
    manufacturingOrderProducts : ManufacturingOrderProduct[] = [];

    addManufacturingOrderProduct(manufacturingOrderProduct: ManufacturingOrderProduct) : void{
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
	      this.manufacturingOrderProducts.push(manufacturingOrderProduct);
	    }
    }
}
