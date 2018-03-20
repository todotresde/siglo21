import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ManufacturingOrder } from './manufacturing-order.model';
import { ManufacturingOrderService } from './manufacturing-order.service';
import { ManufacturingOrderDTO } from '../manufacturing-order-dto/manufacturing-order-dto.model';
import { STAttributeValue } from '../st-attribute-value/st-attribute-value.model';
import { Supply } from '../supply/supply.model';
import { SupplyType } from '../supply-type/supply-type.model';
import { STAttribute } from '../st-attribute/st-attribute.model';
import { Product } from '../product/product.model';

@Injectable()
export class ManufacturingOrderPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private manufacturingOrderService: ManufacturingOrderService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.manufacturingOrderService.findFull(id)
                    .subscribe((manufacturingOrderResponse: HttpResponse<ManufacturingOrder>) => {
                        const manufacturingOrderDTO: ManufacturingOrderDTO = manufacturingOrderResponse.body;
                        this.ngbModalRef = this.manufacturingOrderModalRef(component, manufacturingOrderDTO);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.manufacturingOrderModalRef(component, new ManufacturingOrder());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    manufacturingOrderModalRef(component: Component, manufacturingOrderDTO: ManufacturingOrderDTO): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        const manufacturingOrder: ManufacturingOrder = manufacturingOrderDTO.manufacturingOrder;
        manufacturingOrder.orderDate = this.datePipe.transform(manufacturingOrder.orderDate, 'yyyy-MM-ddTHH:mm:ss');
        modalRef.componentInstance.manufacturingOrder = manufacturingOrder;
        modalRef.componentInstance.moProducts = manufacturingOrderDTO['mOProducts'];
        modalRef.componentInstance.products = manufacturingOrderDTO.products;
        modalRef.componentInstance.stAttributeValues = manufacturingOrderDTO.sTAttributeValues;

        modalRef.componentInstance.supplies = [];
        modalRef.componentInstance.attributeValues = [];

        let productPosition = -1;
        let supplyPosition = -1;
        let productId = -1;
        let supplyId = -1;
        for (let stAttributeValuePosition = 0; stAttributeValuePosition < modalRef.componentInstance.stAttributeValues.length; stAttributeValuePosition++) {
            const stAttributeValue: STAttributeValue = modalRef.componentInstance.stAttributeValues[stAttributeValuePosition];
            const stAttribute: STAttribute = stAttributeValue.stAttribute;
            const supplyType: SupplyType = stAttributeValue.supplyType;
            const supply: Supply = stAttributeValue.supply;
            const product: Product = stAttributeValue.product;

            if (productId !== product.id) {
                productPosition++; productId = product.id;
            }
            if (supplyId !== supply.id) {
                supplyPosition++; supplyId = supply.id;
            }

            if (!modalRef.componentInstance.attributeValues[productPosition]) {
                modalRef.componentInstance.attributeValues[productPosition] = [];
            }
            if (!modalRef.componentInstance.attributeValues[productPosition][supplyPosition]) {
                modalRef.componentInstance.attributeValues[productPosition][supplyPosition] = {};
            }

            modalRef.componentInstance.attributeValues[productPosition][supplyPosition][stAttribute.name] = stAttributeValue.value;
            if (!modalRef.componentInstance.supplies[productPosition + supplyPosition]) {
                modalRef.componentInstance.supplies[productPosition + supplyPosition] = supply;
                modalRef.componentInstance.supplies[productPosition + supplyPosition].supplyType.stattributes = [];
            }
            modalRef.componentInstance.supplies[productPosition + supplyPosition].supplyType.stattributes.push(stAttribute);            
            if (!modalRef.componentInstance.products[productPosition].supplies) {
                modalRef.componentInstance.products[productPosition].supplies = [];
            }
            modalRef.componentInstance.products[productPosition].supplies.push(supply);
        }

        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
