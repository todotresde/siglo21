import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { requestOptionsProvider } from './shared/default-request-options.service'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

import { LoginModule } from './login/login.module';
import { ModulesModule } from './modules/modules.module';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    ModulesModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  providers: [requestOptionsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
