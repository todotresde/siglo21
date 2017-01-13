import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LineDelay } from '../lineDelay';
import { LineDelayService } from '../lineDelay.service';

@Component({
  selector: 'app-lineDelay-detail',
  templateUrl: './lineDelay-detail.component.html',
  providers:[LineDelayService]
})
export class LineDelayDetailComponent implements OnInit {

  lineDelay : LineDelay;
  
  constructor(private route: ActivatedRoute, private lineDelayService: LineDelayService) { 
    this.lineDelay = new LineDelay();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.lineDelayService.get(params["id"]).then(lineDelay =>{ 
          this.lineDelay = lineDelay;
        });
      }
    });

  }

  save(): void {
    this.lineDelayService
        .save(this.lineDelay)
        .then(lineDelay => {
          this.lineDelay = lineDelay; 
        }).catch(error => {
        })
  }

}
