import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductType } from '../productType';
import { ProductTypeService } from '../productType.service';

@Component({
  selector: 'app-productType-detail',
  templateUrl: './productType-detail.component.html',
  providers:[ProductTypeService]
})
export class ProductTypeDetailComponent implements OnInit {

  productType : ProductType;
  
  constructor(private route: ActivatedRoute, private productTypeService: ProductTypeService) { 
    this.productType = new ProductType();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.productTypeService.get(params["id"]).then(productType =>{ 
          this.productType = productType;
        });
      }
    });
  }

  save(): void {
    this.productTypeService
        .save(this.productType)
        .then(productType => {
          this.productType = productType; 
          
        }).catch(error => {
        })
  }
}
