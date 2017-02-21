import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Column } from './column';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[]
})
export class ListComponent implements OnInit {
  @Input() inputRecords: any[];
  @Input() inputColumns: any[];

  columns: Column[];
  records: any;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputRecords": this.generateRecords(changes["inputRecords"].currentValue); break;
          case "inputColumns": this.generateColumns(changes["inputColumns"].currentValue); break;
      }
    }
  }

  private generateRecords(records: any): void{
    this.records = records;
  }

  private generateColumns(columns: any[]): void{
    columns.forEach( column => {
      this.columns.push(new Column(column));
    });
  }

}
