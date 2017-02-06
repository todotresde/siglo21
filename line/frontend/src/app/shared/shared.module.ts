import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2CompleterModule } from "ng2-completer";

import { MessageComponent } from './message/message.component';
import { SortPipe } from './sort.pipe';

@NgModule({
  imports: [TranslateModule, NgbModule, CommonModule, Ng2CompleterModule],
  declarations: [MessageComponent, SortPipe],
  exports: [TranslateModule, NgbModule, MessageComponent, Ng2CompleterModule, SortPipe]
})
export class SharedModule { 
   static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
