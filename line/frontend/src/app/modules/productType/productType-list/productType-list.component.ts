import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductType } from '../productType';
import { ProductTypeService } from '../productType.service';

import { Message } from 'app/shared';

@Component({
  selector: 'app-productType-list',
  templateUrl: './productType-list.component.html',
  providers:[ProductTypeService]
})
export class ProductTypeListComponent implements OnInit {
  message: Message = new Message();
  productTypes: ProductType[];

  constructor(private router: Router, private productTypeService: ProductTypeService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.productTypeService
      .getAll()
      .then(productTypes => this.productTypes = productTypes)
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      });
  }

  create(): void {
    this.router.navigate(['../productType'],{ relativeTo: this.r });
  }

  edit(productType: ProductType): void {
    this.router.navigate(['../productType', productType.id],{ relativeTo: this.r });
  }

  remove(productType: ProductType): void {
    this.productTypeService
      .remove(productType)
      .then(productType => this.productTypes = this.productTypes.filter(u => u.id !== productType.id))
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      });
  }

}
