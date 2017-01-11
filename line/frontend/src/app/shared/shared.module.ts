import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [TranslateModule, NgbModule, CommonModule],
  declarations: [MessageComponent],
  exports: [TranslateModule, NgbModule, MessageComponent]
})
export class SharedModule { 
   static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
