import { NgModule } from '@angular/core';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SharedModule, StatusPipe } from 'app/shared';
import { ManufacturingOrderCustomProductModule } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct.module';
import { DelayModule } from 'app/modules/delay';
import { TraceModule } from 'app/modules/trace';

import { ManufacturingOrderComponent } from './manufacturingOrder.component';
import { ManufacturingOrderListComponent } from './manufacturingOrder-list/manufacturingOrder-list.component';
import { ManufacturingOrderDetailComponent } from './manufacturingOrder-detail/manufacturingOrder-detail.component';

import { ManufacturingOrderQueryComponent } from './manufacturingOrderQuery/manufacturingOrderQuery.component';
import { ManufacturingOrderQueryDetailComponent } from './manufacturingOrderQuery/manufacturingOrderQuery-detail/manufacturingOrderQuery-detail.component';

import { ManufacturingOrderService } from './manufacturingOrder.service';

@NgModule({
    imports: [NgbModule, ManufacturingOrderCustomProductModule, SharedModule, DelayModule, TraceModule],
    declarations: [StatusPipe, ManufacturingOrderComponent, ManufacturingOrderListComponent, ManufacturingOrderDetailComponent, ManufacturingOrderQueryComponent, ManufacturingOrderQueryDetailComponent],
    exports: [ManufacturingOrderComponent, ManufacturingOrderListComponent, ManufacturingOrderDetailComponent, ManufacturingOrderQueryComponent, ManufacturingOrderQueryDetailComponent],
    providers: [ManufacturingOrderService]
})

export class ManufacturingOrderModule { }
