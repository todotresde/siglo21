import { Component, OnInit } from '@angular/core';

import { Trace } from './trace';

@Component({
  selector: 'app-module-trace',
  templateUrl: './trace.component.html'
})
export class TraceComponent {
	selectedTrace: Trace = new Trace();

	activeTrace(trace: Trace): void{
		this.selectedTrace = trace;
	}
}
