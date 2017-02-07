import { Component, OnInit } from '@angular/core';

import { SortPipe } from '../../shared/sort.pipe';

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
  	"queries" : true,
    "security" : true,
    "configuration" : true
  };

  sortPipe: SortPipe = new SortPipe();
  lines: Line[];

  constructor(private lineService: LineService) { }

  ngOnInit() {
    this.lineService
      .getAll()
      .then(lines => {
        this.lines = this.sortPipe.transform(lines,"name");
        this.lines.forEach(line => this.submenues["trace-screens" + line.id] = true)
      })
  }

  toogleSubmenu(element: string) {
    for(let submenu in this.submenues){
      this.submenues[submenu] = true;
    }
    
	  this.submenues[element] = !this.submenues[element];
  }

  getWorkStations(line: Line): WorkStation[]{
    return this.sortPipe.transform((new Line(line)).getWorkStations(),"name");
  }

}
