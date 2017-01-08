import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate/ng2-translate';
import { TranslateService } from 'ng2-translate';

import { MyApp } from './app.component';

import { TabsPage } from './tabs/tabs';
import { QuotationList } from './quotation/quotation-list/quotation-list';
import { QuotationDetail } from './quotation/quotation-detail/quotation-detail';
import { ProductSearch } from './product/product-search/product-search';
import { ClientList } from './client/client-list/client-list';
import { ClientDetail } from './client/client-detail/client-detail';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    QuotationList,
    QuotationDetail,
    ProductSearch,
    ClientDetail,
    ClientList
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    QuotationList,
    QuotationDetail,
    ProductSearch,
    ClientDetail,
    ClientList
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
  constructor(translate: TranslateService) {
      translate.setDefaultLang('es');
  }
}
