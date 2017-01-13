import { Component, OnInit, OnChanges, Input, Output, EventEmitter  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Line } from '../line';
import { LineService } from '../line.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  providers:[LineService]
})
export class LineListComponent implements OnInit, OnChanges {
  @Input() inputLines: Line[];
  @Output() outputLine = new EventEmitter<Line>();
  @Output() outputLines = new EventEmitter<Line[]>();

  lines: Line[];

  constructor(private router: Router, private lineService: LineService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.lineService
      .getAll().then(lines => this.lines = lines)
      .catch(error => {});
  }

  ngOnChanges(): void{

  }

  edit(line: Line): void {
    this.outputLine.emit(line);
  }

  remove(line: Line): void {
    this.lineService
      .remove(line).then(line => this.lines = this.lines.filter(u => u.id !== line.id))
      .catch(error => {});
  }

}
