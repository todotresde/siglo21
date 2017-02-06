import { Component, OnInit, OnChanges, SimpleChange, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

import { Product } from '../../../product/product';
import { ProductService } from '../../../product/product.service';
import { ManufacturingOrderProduct } from '../manufacturingOrderProduct'

import { Message } from '../../../../shared/message/message';

@Component({
  selector: 'app-manufacturing-order-product-detail',
  templateUrl: './manufacturingOrderProduct-detail.component.html',
  providers:[ProductService, CompleterService]
})
export class ManufacturingOrderProductDetailComponent implements OnInit, OnChanges {
  @Input() inputManufacturingOrderProduct = new ManufacturingOrderProduct();
  @Output() outputManufacturingOrderProduct = new EventEmitter<ManufacturingOrderProduct>();

  message : Message = new Message();
  products : Product[];
  manufacturingOrderProduct: ManufacturingOrderProduct;
  
  private dataService: CompleterData;

  constructor(private route: ActivatedRoute, private productService: ProductService, private completerService: CompleterService) { 
      this.manufacturingOrderProduct = new ManufacturingOrderProduct();
      this.dataService = completerService.remote(this.productService.getByDescriptionURL(), 'code,description', 'description');
  }

  ngOnInit() : void{
    this.productService.getAll().then(products => this.products = products);
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    if(changes["inputManufacturingOrderProduct"].currentValue){
      this.manufacturingOrderProduct = changes["inputManufacturingOrderProduct"].currentValue;
    }else{
      this.manufacturingOrderProduct = new ManufacturingOrderProduct();
    }
  }

  add(manufacturingOrderProduct: ManufacturingOrderProduct): void{
    if(this.validForm(manufacturingOrderProduct)){
      this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
      
      this.manufacturingOrderProduct = new ManufacturingOrderProduct();
      this.message.none();
    }else{
      this.message.error("error-missing-values");
    }
  }

  update(manufacturingOrderProduct: ManufacturingOrderProduct): void{
    this.outputManufacturingOrderProduct.emit(manufacturingOrderProduct);
  }

  validForm(manufacturingOrderProduct: ManufacturingOrderProduct): boolean{
    let result: boolean = true;

    result = manufacturingOrderProduct.product != undefined &&  manufacturingOrderProduct.quantity != undefined;

    if(manufacturingOrderProduct.product.productType.hasWidth && manufacturingOrderProduct.product.productType.hasHeight){
      result = result && manufacturingOrderProduct.width != undefined && manufacturingOrderProduct.height != undefined;
    }

    if(manufacturingOrderProduct.product.productType.hasWidth && !manufacturingOrderProduct.product.productType.hasHeight){
      result = result && manufacturingOrderProduct.width != undefined;
    }

    if(!manufacturingOrderProduct.product.productType.hasWidth && manufacturingOrderProduct.product.productType.hasHeight){
      result = result && manufacturingOrderProduct.height != undefined;
    }

    return result;
  }

  onProductSelected(selected: CompleterItem): void{
    if(selected)
      this.manufacturingOrderProduct.product = selected.originalObject;
  }

}
