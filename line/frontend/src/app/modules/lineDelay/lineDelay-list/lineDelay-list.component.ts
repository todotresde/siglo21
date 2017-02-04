import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Delay } from '../../delay/delay';
import { WorkStationConfiguration } from '../../line/workStationConfiguration/workStationConfiguration';

@Component({
    selector: 'app-line-delay-list',
    templateUrl: './lineDelay-list.component.html',
    providers: []
})
export class LineDelayListComponent implements OnInit, OnChanges {
    @Input() inputWorkStationConfigurations: WorkStationConfiguration[];
    
    workStationConfigurations: WorkStationConfiguration[];

    constructor(private router: Router, private r: ActivatedRoute) {

    }

    ngOnInit(): void {
        
    }

    ngOnChanges(changes:  {[propKey: string]:SimpleChange}) {
      if(changes["inputWorkStationConfigurations"].currentValue)
        this.workStationConfigurations = changes["inputWorkStationConfigurations"].currentValue;
    }

}
