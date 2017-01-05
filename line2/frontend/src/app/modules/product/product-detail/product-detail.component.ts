import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductType } from '../../productType/productType';
import { ProductTypeService } from '../../productType/productType.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers:[ProductService, ProductTypeService]
})
export class ProductDetailComponent implements OnInit {

  product : Product;
  messageType : Number = 0;
  message : String = "";
  productTypes: ProductType[];
  selectedProductType: ProductType = new ProductType(); 

  constructor(private route: ActivatedRoute, private productService: ProductService, private productTypeService: ProductTypeService) { 
    this.product = new Product();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.productService.getProduct(params["id"]).then(product =>{ 
          this.product = product;
          this.selectedProductType = this.product.productType;
        });
      }
    });

    this.productTypeService.getProductTypes().then(productTypes => this.productTypes = productTypes);
  }

  save(): void {
    this.product.productType = this.selectedProductType;

    this.productService
        .save(this.product)
        .then(product => {
          this.product = product; 

          //this.messageType = MESSAGE_TYPE.Success;
          this.message = "save-success";
          
          this.goBack();
        }).catch(error => {
          //this.messageType = MESSAGE_TYPE.Error;
          this.message = error;
        })
  }

  goBack(): void {
    window.history.back();
  }

}
