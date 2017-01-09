import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { MESSAGE_TYPE } from './message.constant';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnChanges  {
  @Input() type : MESSAGE_TYPE;
  @Input() message : String = "";

  constructor(private translateService: TranslateService) { 
  	
  }

  ngOnChanges(changes: SimpleChanges) {
  	this.message = (changes["message"]) ? changes["message"].currentValue : "";
    
  	switch (changes["type"].currentValue) {
  		case MESSAGE_TYPE.Success: 
        this.type = MESSAGE_TYPE.Success;
        this.message = this.translateService.instant("operation-success");
        break;
  		case MESSAGE_TYPE.Info: 
        this.type = MESSAGE_TYPE.Info;
        this.message = this.translateService.instant("operation-info");
        break;
  		case MESSAGE_TYPE.Warning: 
        this.type = MESSAGE_TYPE.Warning;
        this.message = this.translateService.instant("operation-wanring");
        break;
  		case MESSAGE_TYPE.Error: 
        this.type = MESSAGE_TYPE.Error;
        this.message = this.translateService.instant("operation-error");
        break;
  		default: this.type = MESSAGE_TYPE.None;break;
  	}
  }


  showMessage(type : Number) : Boolean{
  	return (this.type == type);
  }

}