import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { ManufacturingOrderProductModule } from '../manufacturingOrderProduct/manufacturingOrderProduct.module';

import { ManufacturingOrderCustomProductComponent } from './manufacturingOrderCustomProduct.component';
import { ManufacturingOrderCustomProductListComponent } from './manufacturingOrderCustomProduct-list/manufacturingOrderCustomProduct-list.component';
import { ManufacturingOrderCustomProductDetailComponent } from './manufacturingOrderCustomProduct-detail/manufacturingOrderCustomProduct-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, NgbModule, ManufacturingOrderProductModule, SharedModule],
    declarations: [ManufacturingOrderCustomProductComponent, ManufacturingOrderCustomProductListComponent, ManufacturingOrderCustomProductDetailComponent],
    exports: [ManufacturingOrderCustomProductComponent, ManufacturingOrderCustomProductListComponent, ManufacturingOrderCustomProductDetailComponent]
})

export class ManufacturingOrderCustomProductModule { }
