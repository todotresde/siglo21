import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Line } from '../line';
import { LineService } from '../line.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css'],
  providers:[LineService]
})
export class LineListComponent implements OnInit {
  lines: Line[];

  constructor(private router: Router, private lineService: LineService, private r:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.lineService.getLines().then(lines => this.lines = lines);
  }

  create(): void {
    this.router.navigate(['../line'],{ relativeTo: this.r });
  }

  edit(line: Line): void {
    this.router.navigate(['../line', line.id],{ relativeTo: this.r });
  }

  remove(line: Line): void {
    this.lineService.removeLine(line).then(line => this.lines = this.lines.filter(u => u.id !== line.id));
  }

}
