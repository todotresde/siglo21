import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { ManufacturingOrderProductComponent } from './manufacturingOrderProduct.component';
import { ManufacturingOrderProductListComponent } from './manufacturingOrderProduct-list/manufacturingOrderProduct-list.component';
import { ManufacturingOrderProductDetailComponent } from './manufacturingOrderProduct-detail/manufacturingOrderProduct-detail.component';

@NgModule({
    imports: [SharedModule],
    declarations: [ManufacturingOrderProductComponent, ManufacturingOrderProductListComponent, ManufacturingOrderProductDetailComponent],
    exports: [ManufacturingOrderProductComponent, ManufacturingOrderProductListComponent, ManufacturingOrderProductDetailComponent]
})

export class ManufacturingOrderProductModule { }
