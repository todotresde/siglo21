import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductType } from '../../productType/productType';
import { ProductTypeService } from '../../productType/productType.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  providers:[ProductService, ProductTypeService]
})
export class ProductDetailComponent implements OnInit {

  product : Product;
  productTypes: ProductType[];
  selectedProductType: ProductType = new ProductType(); 

  constructor(private route: ActivatedRoute, private productService: ProductService, private productTypeService: ProductTypeService) { 
    this.product = new Product();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.productService.get(params["id"]).then(product =>{ 
          this.product = product;
          this.selectedProductType = this.product.productType;
        });
      }
    });

    this.productTypeService.getAll().then(productTypes => this.productTypes = productTypes);
  }

  save(): void {
    this.product.productType = this.selectedProductType;

    this.productService
        .save(this.product)
        .then(product => {
          this.product = product; 
        }).catch(error => {
        })
  }

}
