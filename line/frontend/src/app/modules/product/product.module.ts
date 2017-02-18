import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
    imports: [SharedModule],
    declarations: [ProductComponent, ProductListComponent, ProductDetailComponent],
    exports: [ProductComponent, ProductListComponent, ProductDetailComponent]
})

export class ProductModule { }
