import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Line } from '../line/line';

@Component({
  selector: 'app-module-line',
  templateUrl: './line.component.html'
})
export class LineComponent {
	selectedLine: Line = new Line();

	constructor(private router: Router, private r:ActivatedRoute) {

  	}

	setSelectedLine(line: Line): void{
		this.selectedLine = line;

		this.router.navigate(['../line', line.id],{ relativeTo: this.r });
	}

	create(): void {
	    this.router.navigate(['../line'],{ relativeTo: this.r });
	}
}
