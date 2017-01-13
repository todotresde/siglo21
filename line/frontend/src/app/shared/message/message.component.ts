import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { Message } from './message';

import { MESSAGE_TYPE } from './message.constant';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnChanges  {
  @Input() message : Message = new Message();

  constructor(private translateService: TranslateService) { 
  	
  }

  ngOnChanges(changes: SimpleChanges) {
    this.message = (changes["message"] && changes["message"].currentValue) ? changes["message"].currentValue : new Message();
    
    switch (this.message.type) {
  		case MESSAGE_TYPE.Success: 
        this.message.success();
        break;
  		case MESSAGE_TYPE.Info: 
        this.message.info();
        break;
  		case MESSAGE_TYPE.Warning: 
        this.message.warning();
        break;
  		case MESSAGE_TYPE.Error: 
        this.message.error();
        break;
  		default: 
        this.message.none();
        break;
  	}
  }


  showMessage(type : Number) : Boolean{
  	return (this.message.type == type);
  }

}