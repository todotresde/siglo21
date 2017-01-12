import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LineDelay } from '../lineDelay';
import { LineDelayService } from '../lineDelay.service';
import { LineDelayType } from '../../lineDelayType/lineDelayType';
import { LineDelayTypeService } from '../../lineDelayType/lineDelayType.service';

@Component({
  selector: 'app-lineDelay-detail',
  templateUrl: './lineDelay-detail.component.html',
  providers:[LineDelayService, LineDelayTypeService]
})
export class LineDelayDetailComponent implements OnInit {

  lineDelay : LineDelay;
  lineDelayTypes: LineDelayType[];
  selectedLineDelayType: LineDelayType = new LineDelayType(); 

  constructor(private route: ActivatedRoute, private lineDelayService: LineDelayService, private lineDelayTypeService: LineDelayTypeService) { 
    this.lineDelay = new LineDelay();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.lineDelayService.get(params["id"]).then(lineDelay =>{ 
          this.lineDelay = lineDelay;
          this.selectedLineDelayType = this.lineDelay.lineDelayType;
        });
      }
    });

    this.lineDelayTypeService.getAll().then(lineDelayTypes => this.lineDelayTypes = lineDelayTypes);
  }

  save(): void {
    this.lineDelay.lineDelayType = this.selectedLineDelayType;

    this.lineDelayService
        .save(this.lineDelay)
        .then(lineDelay => {
          this.lineDelay = lineDelay; 
        }).catch(error => {
        })
  }

}
