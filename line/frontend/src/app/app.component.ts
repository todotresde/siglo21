import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Line';

  	constructor(translate: TranslateService) {
        translate.setDefaultLang('es');
        translate.use('es');
    }

}
