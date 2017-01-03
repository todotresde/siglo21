import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Line } from '../line';
import { LineService } from '../line.service';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.css'],
  providers:[LineService]
})
export class LineDetailComponent implements OnInit {

  line : Line;
  messageType : Number = 0;
  message : String = "";

  constructor(private route: ActivatedRoute, private lineService: LineService) { 
    this.line = new Line();
  }

  ngOnInit() : void{
    this.route.params.subscribe(params => {
      if(params["id"]){
        this.lineService.getLine(params["id"]).then(line =>{ 
          this.line = line;
        });
      }
    });
  }

  save(): void {
    this.lineService
        .save(this.line)
        .then(line => {
          this.line = line; 

          //this.messageType = MESSAGE_TYPE.Success;
          this.message = "save-success";
          
          this.goBack();
        }).catch(error => {
          //this.messageType = MESSAGE_TYPE.Error;
          this.message = error;
        })
  }

  goBack(): void {
    window.history.back();
  }

}
