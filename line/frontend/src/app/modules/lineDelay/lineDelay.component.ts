import { Component, OnInit } from '@angular/core';

import { Line } from '../line/line';

@Component({
  selector: 'app-module-lineDelay',
  templateUrl: './lineDelay.component.html'
})
export class LineDelayComponent {
	selectedLine: Line = new Line();

	setSelectedLine(line: Line): void{
		this.selectedLine = line;
	}

}
