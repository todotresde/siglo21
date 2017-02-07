import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ManufacturingOrderCustomProductModule } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct.module';

import { ManufacturingOrderComponent } from './manufacturingOrder.component';
import { ManufacturingOrderListComponent } from './manufacturingOrder-list/manufacturingOrder-list.component';
import { ManufacturingOrderDetailComponent } from './manufacturingOrder-detail/manufacturingOrder-detail.component';

import { ManufacturingOrderQueryComponent } from './manufacturingOrderQuery/manufacturingOrderQuery.component';

import { ManufacturingOrderService } from './manufacturingOrder.service';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, NgbModule, ManufacturingOrderCustomProductModule, SharedModule],
    declarations: [ManufacturingOrderComponent, ManufacturingOrderListComponent, ManufacturingOrderDetailComponent, ManufacturingOrderQueryComponent],
    exports: [ManufacturingOrderComponent, ManufacturingOrderListComponent, ManufacturingOrderDetailComponent, ManufacturingOrderQueryComponent],
    providers: [ManufacturingOrderService]
})

export class ManufacturingOrderModule { }
