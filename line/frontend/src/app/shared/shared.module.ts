import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2CompleterModule } from "ng2-completer";

import { MessageComponent } from './message/message.component';
import { SortPipe } from './sort.pipe';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
    imports: [
    	CommonModule, 
    	RouterModule, 
    	FormsModule, 
    	TranslateModule, 
    	NgbModule, 
    	Ng2CompleterModule,
        ComponentsModule
    ],
    declarations: [MessageComponent, SortPipe],
    exports: [
    	CommonModule, 
    	RouterModule, 
    	FormsModule, 
    	TranslateModule, 
    	NgbModule, 
    	MessageComponent, 
    	Ng2CompleterModule, 
    	SortPipe,
        ComponentsModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
