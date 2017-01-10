import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManufacturingOrder } from '../manufacturingOrder';
import { ManufacturingOrderService } from '../manufacturingOrder.service';
import { ManufacturingOrderCustomProduct } from '../manufacturingOrderCustomProduct/manufacturingOrderCustomProduct';

@Component({
  selector: 'app-manufacturing-order-detail',
  templateUrl: './manufacturingOrder-detail.component.html',
  styleUrls: ['./manufacturingOrder-detail.component.css'],
  providers:[ManufacturingOrderService]
})
export class ManufacturingOrderDetailComponent implements OnInit {
  manufacturingOrder : ManufacturingOrder;
  
  constructor(private router: Router, private route: ActivatedRoute, private manufacturingOrderService: ManufacturingOrderService) { 
    this.manufacturingOrder = new ManufacturingOrder();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.manufacturingOrderService.get(params["id"])
          .then(manufacturingOrder =>{ this.manufacturingOrder = manufacturingOrder;});
      }
    });
  }

  save(manufacturingOrder: ManufacturingOrder): void {
    this.manufacturingOrderService
        .save(manufacturingOrder)
        .then(manufacturingOrder => {
          this.manufacturingOrder = manufacturingOrder; 
          
        }).catch(error => {
        })
  }

  addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct: ManufacturingOrderCustomProduct): void {
    debugger
    this.manufacturingOrder.addManufacturingOrderCustomProduct(manufacturingOrderCustomProduct);
  }

  newManufacturingOrderCustomProduct(): void {
    this.manufacturingOrder = new ManufacturingOrder();
  }

}
