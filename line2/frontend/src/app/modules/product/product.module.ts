import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, NgbModule],
    declarations: [ProductComponent, ProductListComponent, ProductDetailComponent],
    exports: [ProductComponent, ProductListComponent, ProductDetailComponent]
})

export class ProductModule { }
