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
  @Input() inputRecordActions: any[];
  @Input() inputHeaderActions: any[];
  @Input() inputComponent: any;

  columns: Column[] = [];
  recordActions: any[] = [];
  headerActions: any[] = [];
  records: any;
  component: any;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
    for (let propName in changes) {
      switch(propName){
          case "inputRecords": this.generateRecords(changes["inputRecords"].currentValue); break;
          case "inputColumns": this.generateColumns(changes["inputColumns"].currentValue); break;
          case "inputRecordActions": this.generateRecordActions(changes["inputRecordActions"].currentValue); break;
          case "inputHeaderActions": this.generateHeaderActions(changes["inputHeaderActions"].currentValue); break;
          case "inputComponent": this.generateComponent(changes["inputComponent"].currentValue); break;
      }
    }
  }

  private generateRecords(records: any): void{
    if(records)
      this.records = records;
  }

  private generateColumns(columns: any[]): void{
    if(columns)
      columns.forEach( column => {
        this.columns.push(new Column(column));
      });
  }

  private generateRecordActions(recordActions: any[]): void{
    if(recordActions)
      this.recordActions = recordActions;
  }

  private generateHeaderActions(headerActions: any[]): void{
    if(headerActions)
      this.headerActions = headerActions;
  }

  private generateComponent(component: any): void{
    if(component){
      this.component = component;
    }
  }

}
