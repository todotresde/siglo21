import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from 'ng2-translate';

import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [TranslateModule, CommonModule],
  declarations: [MessageComponent],
  exports: [TranslateModule, MessageComponent]
})
export class SharedModule { 
   static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
