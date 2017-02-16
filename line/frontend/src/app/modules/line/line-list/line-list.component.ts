import { Component, OnInit, OnChanges, Input, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Line } from '../line';
import { LineService } from '../line.service';

import { Message } from 'app/shared';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  providers:[LineService]
})
export class LineListComponent implements OnInit, OnChanges {
  @Input() inputLines: Line[];
  @Output() outputLine = new EventEmitter<Line>();
  @Output() outputLines = new EventEmitter<Line[]>();

  message: Message = new Message();
  lines: Line[];

  constructor(private router: Router, private lineService: LineService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.lineService
      .getAll().then(lines => this.lines = lines)
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })
  }

  ngOnChanges(): void{

  }

  create(): void {
      this.router.navigate(['../line'],{ relativeTo: this.r });
  }

  edit(line: Line): void {
    this.outputLine.emit(line);
  }

  remove(line: Line): void {
    this.lineService
      .remove(line)
      .then(lineId => { 
        this.lines = this.lines.filter(l => l.id !== lineId);
        this.message.success("deleted-successfully");
      })
      .catch(error => {
        this.message.error(JSON.parse(error._body).message);
      })
  }

}
