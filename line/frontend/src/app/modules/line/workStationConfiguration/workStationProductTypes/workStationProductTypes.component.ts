import { Component, OnInit , EventEmitter, Input, Output, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductType, ProductTypeService } from 'app/modules/productType';

import { Message } from 'app/shared';

@Component({
  selector: 'app-workstation-product-types',
  templateUrl: './workStationProductTypes.component.html',
  providers:[ProductTypeService]
})
export class WorkStationProductTypesComponent implements OnInit, OnChanges {
  @Input() inputClean: boolean = false;
  @Input() inputProductTypes: ProductType[] = [];
  @Output() outputProductTypes = new EventEmitter<ProductType[]>();

  message: Message = new Message();
  productTypes : ProductType[];
  selectedProductType : ProductType;
  selectedProductTypes : ProductType[];
  productTypesById : any = {};
  
  constructor(private route: ActivatedRoute, private productTypeService: ProductTypeService) { 
      this.selectedProductTypes = this.inputProductTypes;
      this.selectedProductType = new ProductType();
  }

  ngOnInit() : void{
      this.productTypeService.getAll().then(productTypes => {
        this.productTypes = productTypes;

        this.productTypes.forEach(productType => this.productTypesById[productType.id] = productType);
      });
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputClean": if(changes["inputClean"].currentValue){this.clean();} break;
          case "inputProductTypes": 
            if(changes["inputProductTypes"].currentValue){
              this.selectedProductTypes = changes["inputProductTypes"].currentValue;
            } 
            break;
      }
    }
  }

  add(productType: ProductType): void {
    debugger
    if(this.exist(productType)){
      this.message.error("error-product-type-already-assigned");
    }else{
      this.selectedProductTypes.push(productType);
      this.outputProductTypes.emit(this.selectedProductTypes);

      this.selectedProductType = new ProductType();
      this.message.none();
    }
  }

  remove(productType: ProductType): void {
    this.selectedProductTypes = this.selectedProductTypes.filter(u => u.id !== productType.id);
    this.outputProductTypes.emit(this.selectedProductTypes);
  }

  private exist(productType: ProductType): boolean{
    let result: ProductType[] = this.selectedProductTypes.filter(pT => pT.id === productType.id);
    return result.length > 0;
  }

  private clean(): void{
    this.message.none();
    this.selectedProductTypes = [];
    this.selectedProductType = new ProductType();
  }

}