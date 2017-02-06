import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductType } from '../../productType/productType';
import { ProductTypeService } from '../../productType/productType.service';

import { Message } from '../../../shared/message/message';
import { Commons } from '../../../shared/commons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  providers:[ProductService, ProductTypeService, CompleterService]
})
export class ProductDetailComponent implements OnInit {
  message: Message = new Message();
  product : Product;
  productTypes: ProductType[];
  selectedProductType: ProductType = new ProductType(); 

  private dataService: CompleterData;

  constructor(private location: Location, private route: ActivatedRoute, private productService: ProductService, private productTypeService: ProductTypeService, private completerService: CompleterService) { 
    this.product = new Product();
    this.dataService = completerService.remote(this.productTypeService.getByNameURL(), 'code,name', 'name');
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.productService.get(params["id"])
          .then(product =>{ 
            this.product = product;
            this.selectedProductType = this.product.productType;
          })
          .catch(error => {
            this.message.error(JSON.parse(error._body).message);
          });
      }
    });

    this.productTypeService
      .getAll()
      .then(productTypes => this.productTypes = productTypes)
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })
  }

  save(product: Product, selectedProductType: ProductType): void {
    product.productType = selectedProductType;

    this.productService
        .save(product)
        .then(product => {
          this.message.success("");

          Commons.delay().then(() => {
            this.location.back();
          });
        })
        .catch(error => {
          this.message.error(JSON.parse(error._body).message);
        })
  }

  onProductTypeSelected(selected: CompleterItem): void{
    this.selectedProductType = selected.originalObject;
  }

}
