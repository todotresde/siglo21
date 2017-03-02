import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { ProductTypeComponent } from './productType.component';
import { ProductTypeListComponent } from './productType-list/productType-list.component';
import { ProductTypeDetailComponent } from './productType-detail/productType-detail.component';

@NgModule({
    imports: [SharedModule],
    declarations: [ProductTypeComponent, ProductTypeListComponent, ProductTypeDetailComponent],
    exports: [ProductTypeComponent, ProductTypeListComponent, ProductTypeDetailComponent]
})

export class ProductTypeModule { }
