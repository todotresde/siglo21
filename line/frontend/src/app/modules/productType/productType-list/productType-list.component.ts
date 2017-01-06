import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductType } from '../productType';
import { ProductTypeService } from '../productType.service';

@Component({
  selector: 'app-productType-list',
  templateUrl: './productType-list.component.html',
  styleUrls: ['./productType-list.component.css'],
  providers:[ProductTypeService]
})
export class ProductTypeListComponent implements OnInit {
  productTypes: ProductType[];

  constructor(private router: Router, private productTypeService: ProductTypeService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.productTypeService.getProductTypes().then(productTypes => this.productTypes = productTypes);
  }

  create(): void {
    this.router.navigate(['../productType'],{ relativeTo: this.r });
  }

  edit(productType: ProductType): void {
    this.router.navigate(['../productType', productType.id],{ relativeTo: this.r });
  }

  remove(productType: ProductType): void {
    this.productTypeService.removeProductType(productType).then(productType => this.productTypes = this.productTypes.filter(u => u.id !== productType.id));
  }

}
