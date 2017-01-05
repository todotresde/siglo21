import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ManufacturingOrderComponent } from './manufacturingOrder.component';
import { ManufacturingOrderListComponent } from './manufacturingOrder-list/manufacturingOrder-list.component';
import { ManufacturingOrderDetailComponent } from './manufacturingOrder-detail/manufacturingOrder-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, NgbModule],
    declarations: [ManufacturingOrderComponent, ManufacturingOrderListComponent, ManufacturingOrderDetailComponent],
    exports: [ManufacturingOrderComponent, ManufacturingOrderListComponent, ManufacturingOrderDetailComponent, ]
})

export class ManufacturingOrderModule { }
