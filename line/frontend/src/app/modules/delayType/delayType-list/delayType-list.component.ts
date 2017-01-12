import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DelayType } from '../delayType';
import { DelayTypeService } from '../delayType.service';

@Component({
  selector: 'app-delayType-list',
  templateUrl: './delayType-list.component.html',
  providers:[DelayTypeService]
})
export class DelayTypeListComponent implements OnInit {
  delayTypes: DelayType[];

  constructor(private router: Router, private delayTypeService: DelayTypeService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.delayTypeService
      .getAll()
      .then(delayTypes => this.delayTypes = delayTypes)
      .catch(error => {});
  }

  create(): void {
    this.router.navigate(['../delayType'],{ relativeTo: this.r });
  }

  edit(delayType: DelayType): void {
    this.router.navigate(['../delayType', delayType.id],{ relativeTo: this.r });
  }

  remove(delayType: DelayType): void {
    this.delayTypeService
      .remove(delayType)
      .then(delayType => this.delayTypes = this.delayTypes.filter(u => u.id !== delayType.id))
      .catch(error => {});
  }

}
