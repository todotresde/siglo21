import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { ManufacturingOrderProductModule } from '../manufacturingOrderProduct/manufacturingOrderProduct.module';

import { ManufacturingOrderCustomProductComponent } from './manufacturingOrderCustomProduct.component';
import { ManufacturingOrderCustomProductListComponent } from './manufacturingOrderCustomProduct-list/manufacturingOrderCustomProduct-list.component';
import { ManufacturingOrderCustomProductDetailComponent } from './manufacturingOrderCustomProduct-detail/manufacturingOrderCustomProduct-detail.component';

@NgModule({
    imports: [ManufacturingOrderProductModule, SharedModule],
    declarations: [ManufacturingOrderCustomProductComponent, ManufacturingOrderCustomProductListComponent, ManufacturingOrderCustomProductDetailComponent],
    exports: [ManufacturingOrderCustomProductComponent, ManufacturingOrderCustomProductListComponent, ManufacturingOrderCustomProductDetailComponent]
})

export class ManufacturingOrderCustomProductModule { }
