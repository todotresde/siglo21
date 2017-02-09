import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { ManufacturingOrderCustomProductModule } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct.module';
import { DelayModule } from '../delay/delay.module';
import { TraceModule } from '../trace/trace.module';

import { ManufacturingOrderComponent } from './manufacturingOrder.component';
import { ManufacturingOrderListComponent } from './manufacturingOrder-list/manufacturingOrder-list.component';
import { ManufacturingOrderDetailComponent } from './manufacturingOrder-detail/manufacturingOrder-detail.component';

import { ManufacturingOrderQueryComponent } from './manufacturingOrderQuery/manufacturingOrderQuery.component';
import { ManufacturingOrderQueryDetailComponent } from './manufacturingOrderQuery/manufacturingOrderQuery-detail/manufacturingOrderQuery-detail.component';

import { ManufacturingOrderService } from './manufacturingOrder.service';

import { StatusPipe } from '../../shared/status.pipe';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, NgbModule, ManufacturingOrderCustomProductModule, SharedModule, DelayModule, TraceModule],
    declarations: [StatusPipe, ManufacturingOrderComponent, ManufacturingOrderListComponent, ManufacturingOrderDetailComponent, ManufacturingOrderQueryComponent, ManufacturingOrderQueryDetailComponent],
    exports: [ManufacturingOrderComponent, ManufacturingOrderListComponent, ManufacturingOrderDetailComponent, ManufacturingOrderQueryComponent, ManufacturingOrderQueryDetailComponent],
    providers: [ManufacturingOrderService]
})

export class ManufacturingOrderModule { }
