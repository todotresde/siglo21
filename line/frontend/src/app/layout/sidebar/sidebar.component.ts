import { Component, OnInit } from '@angular/core';

import { Line } from '../../modules/line/line';
import { WorkStation } from '../../modules/workStation/workStation';
import { LineService } from '../../modules/line/line.service';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[LineService]
})
export class SidebarComponent implements OnInit {
  submenues: any = {
  	"delays" : true,
    "security" : true,
    "configuration" : true,
    "trace-screens" : true
  };

  lines: Line[];

  constructor(private lineService: LineService) { }

  ngOnInit() {
    this.lineService
      .getAll()
      .then(lines => {this.lines = lines})
  }

  toogleSubmenu(element: string) {
	  this.submenues[element] = !this.submenues[element];
  }

  getWorkStations(line: Line): WorkStation[]{
    return (new Line(line)).getWorkStations();
  }

}
