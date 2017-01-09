import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductType } from '../productType';
import { ProductTypeService } from '../productType.service';

@Component({
  selector: 'app-productType-detail',
  templateUrl: './productType-detail.component.html',
  styleUrls: ['./productType-detail.component.css'],
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
        this.productTypeService.getProductType(params["id"]).then(productType =>{ 
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
          
          this.goBack();
        }).catch(error => {
        })
  }

  goBack(): void {
    window.history.back();
  }

}
