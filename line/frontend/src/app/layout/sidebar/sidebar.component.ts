import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  submenues: any = {
  	"delays" : true
  };

  constructor() { }

  ngOnInit() {
  }

  toogleSubmenu(element: string) {
	this.submenues[element] = !this.submenues[element];
  }

}
