import { Component, OnInit , EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductType } from '../../../productType/productType';
import { ProductTypeService } from '../../../productType/productType.service';

@Component({
  selector: 'app-workstation-product-types',
  templateUrl: './workStationProductTypes.component.html',
  styleUrls: ['./workStationProductTypes.component.css'],
  providers:[ProductTypeService]
})
export class WorkStationProductTypesComponent implements OnInit {
  @Input() inputProductTypes: ProductType[] = [];
  @Output() outputProductTypes = new EventEmitter<ProductType[]>();

  productTypes : ProductType[];
  selectedProductType : ProductType;
  selectedProductTypes : ProductType[];
  
  constructor(private route: ActivatedRoute, private productTypeService: ProductTypeService) { 
      this.selectedProductTypes = this.inputProductTypes;
      this.selectedProductType = new ProductType();
  }

  ngOnInit() : void{
      this.productTypeService.getProductTypes().then(productTypes => this.productTypes = productTypes);
  }

  add(productType: ProductType): void {
    this.selectedProductTypes.push(productType);
    this.outputProductTypes.emit(this.selectedProductTypes);
  }

  remove(productType: ProductType): void {
    this.selectedProductTypes = this.selectedProductTypes.filter(u => u.id !== productType.id)
    this.outputProductTypes.emit(this.selectedProductTypes);
  }

}