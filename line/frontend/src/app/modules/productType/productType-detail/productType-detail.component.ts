import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductType } from '../productType';
import { ProductTypeService } from '../productType.service';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';

@Component({
  selector: 'app-productType-detail',
  templateUrl: './productType-detail.component.html',
  providers:[ProductTypeService]
})
export class ProductTypeDetailComponent implements OnInit {
  message: Message = new Message();
  productType : ProductType;
  
  constructor(private location: Location, private route: ActivatedRoute, private productTypeService: ProductTypeService) { 
    this.productType = new ProductType();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.productTypeService
          .get(params["id"])
          .then(productType =>{ 
            this.productType = productType;
          })
          .catch(error => {
            this.message.error(JSON.parse(error._body).message);
          });
      }
    });
  }

  save(productType: ProductType): void {
    this.productTypeService
        .save(productType)
        .then(productType => {
          this.productType = productType; 
          
          this.message.success("");

          Commons.delay().then(() => {
            this.back();
          });
        }).catch(error => {
          this.message.error(JSON.parse(error._body).message);
        });
  }

  back(): void{
    this.location.back();
  }
}
