import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { ManufacturingOrderProductComponent } from './manufacturingOrderProduct.component';
import { ManufacturingOrderProductListComponent } from './manufacturingOrderProduct-list/manufacturingOrderProduct-list.component';
import { ManufacturingOrderProductDetailComponent } from './manufacturingOrderProduct-detail/manufacturingOrderProduct-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [ManufacturingOrderProductComponent, ManufacturingOrderProductListComponent, ManufacturingOrderProductDetailComponent],
    exports: [ManufacturingOrderProductComponent, ManufacturingOrderProductListComponent, ManufacturingOrderProductDetailComponent]
})

export class ManufacturingOrderProductModule { }
