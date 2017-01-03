import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { MESSAGE_TYPE } from './message.constant';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnChanges  {
  @Input() messageType : MESSAGE_TYPE;
  @Input() message : String = "";

  constructor() { 
  	
  }

  ngOnChanges(changes: SimpleChanges) {
  	this.message = changes["message"].currentValue;

  	switch (changes["messageType"].currentValue) {
  		case MESSAGE_TYPE.Success: this.messageType = MESSAGE_TYPE.Success;break;
  		case MESSAGE_TYPE.Info: this.messageType = MESSAGE_TYPE.Info;break;
  		case MESSAGE_TYPE.Warning: this.messageType = MESSAGE_TYPE.Warning;break;
  		case MESSAGE_TYPE.Error: this.messageType = MESSAGE_TYPE.Error;break;
  		default: this.messageType = MESSAGE_TYPE.None;break;
  	}
  }


  showMessage(messageType : Number) : Boolean{
  	return (this.messageType == messageType);
  }

}
