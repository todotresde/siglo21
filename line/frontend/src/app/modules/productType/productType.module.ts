import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ProductTypeComponent } from './productType.component';
import { ProductTypeListComponent } from './productType-list/productType-list.component';
import { ProductTypeDetailComponent } from './productType-detail/productType-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [ProductTypeComponent, ProductTypeListComponent, ProductTypeDetailComponent],
    exports: [ProductTypeComponent, ProductTypeListComponent, ProductTypeDetailComponent]
})

export class ProductTypeModule { }
